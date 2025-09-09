import {
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	inject,
	input,
	output,
	signal,
	ViewEncapsulation,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextComponent } from '../text/text.component';
import { ButtonComponent, CloseButtonComponent } from '../buttons';
import {
	ButtonType,
	Colors,
	ExtraSize,
	FileFormats,
	IconType,
	TextType,
	ToastTypeEnum,
} from '../../shared/models';
import { BadgeComponent } from '../badge/badge.component';
import { SharedPopupService } from '../../shared/services';
import { SafePipe } from '../../core/pipes';

interface FileValidationConfig {
	maxSizeMB: number;
	maxFiles: number;
}

interface FileMetadata {
	file: File;
	id: string;
	preview?: string;
}

/**
 * Компонент для загрузки нескольких файлов с поддержкой drag-and-drop, предпросмотра и валидации.
 *
 * Поддерживает ограничение по количеству файлов, максимальному размеру и допустимым форматам.
 * При удалении файла генерируется событие отмены загрузки.
 *
 * @example
 * ```html
 * Параметры:
 *
 * [disabled]: boolean - Флаг блокировки компонента - необязательный, по умолчанию: false
 *
 * [maxSize]: number - Максимальный размер одного файла (в МБ) -
 * необязательный, по умолчанию: 0 (без ограничения)
 *
 * [maxFiles]: number - Максимальное количество файлов -
 * необязательный, по умолчанию: 3
 *
 * [files]: File[] - Предзагруженные файлы -
 * необязательный, по умолчанию: []
 *
 * [allowedFormatsList]: FileFormats[] - Список допустимых форматов файлов -
 * необязательный, по умолчанию: [JPEG, PNG, GIF]
 *
 * (filesChanged): EventEmitter<File[]> - Событие изменения списка файлов
 *
 * (uploadCancel): EventEmitter<File> - Событие отмены загрузки файла
 *
 * <ss-lib-files-upload
 *   [disabled]="false"
 *   [maxSize]="5"
 *   [maxFiles]="3"
 *   [files]="preloadedFiles"
 *   [allowedFormatsList]="[FileFormats.JPEG, FileFormats.PNG]"
 *   (filesChanged)="onFilesChange($event)"
 *   (uploadCancel)="onUploadCancel($event)"
 * />
 * ```
 */

@Component({
	selector: 'ss-lib-files-upload',
	templateUrl: './files-upload.component.html',
	styleUrls: ['./files-upload.component.scss'],
	imports: [
		TextComponent,
		ButtonComponent,
		BadgeComponent,
		FormsModule,
		ReactiveFormsModule,
		SafePipe,
		CloseButtonComponent,
	],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.Emulated,
})
export class FilesUploadComponent {
	private readonly sharedPopupService = inject(SharedPopupService);

	public readonly disabled = input<boolean>(false);
	public readonly maxSize = input<number>(0);
	public readonly maxFiles = input<number>(3);
	public readonly files = input<File[]>([]);
	public readonly allowedFormatsList = input<FileFormats[]>([
		FileFormats.JPEG,
		FileFormats.PNG,
		FileFormats.GIF,
	]);

	public readonly filesChanged = output<File[]>();
	public readonly uploadCancel = output<File>();

	protected readonly filesMetadata = signal<FileMetadata[]>([]);
	protected readonly hover = signal<boolean>(false);

	protected readonly allowedFormatsText = computed((): string => {
		const formats = this.allowedFormatsList();
		const maxFiles = this.maxFiles();
		const maxSize = this.maxSize();

		const formattedFormats = formats
			.map((value) =>
				Object.keys(FileFormats).find(
					(key) =>
						FileFormats[key as keyof typeof FileFormats] === value,
				),
			)
			.filter(Boolean)
			.join(', ');

		const fileCountText = `Макс. ${maxFiles} ${this.getFilePluralForm(maxFiles)}`;
		const formatsText = formattedFormats ? `, ${formattedFormats}` : '';

		const sizeText =
			maxSize && maxSize > 0
				? ` (макс. размер ${maxSize} МБ на файл)`
				: '';

		return `${fileCountText}${formatsText}${sizeText}`;
	});

	protected readonly canAddMoreFiles = computed((): boolean => {
		return this.filesMetadata().length >= this.maxFiles();
	});

	protected readonly IconType = IconType;
	protected readonly ExtraSize = ExtraSize;
	protected readonly TextType = TextType;
	protected readonly Colors = Colors;
	protected readonly ButtonType = ButtonType;

	constructor() {
		effect(() => {
			const files = this.files() ?? [];

			if (files.length > 0) {
				const metadata = files.map((file) => ({
					file,
					id: this.generateId(),
					preview: this.createPreview(file),
				}));

				this.filesMetadata.set(metadata);
			}
		});
	}

	protected onDragEnter(event: DragEvent): void {
		event.preventDefault();

		if (!this.disabled()) {
			this.hover.set(true);
		}
	}

	protected onDragLeave(event: DragEvent): void {
		event.preventDefault();
		this.hover.set(false);
	}

	protected onDropSuccess(event: DragEvent): void {
		event.preventDefault();
		this.hover.set(false);
		const files = event.dataTransfer?.files;

		if (files && files.length > 0) {
			this.validateAndProcessFiles(Array.from(files));
		}
	}

	protected onFileSelect(files: FileList | null): void {
		if (files && files.length > 0) {
			this.validateAndProcessFiles(Array.from(files));
		}
	}

	protected onFileDelete(fileId: string): void {
		const fileToDelete = this.filesMetadata().find(
			(f) => f.id === fileId,
		)?.file;

		if (fileToDelete) {
			this.uploadCancel.emit(fileToDelete);

			this.filesMetadata.update((files) =>
				files.filter((f) => f.id !== fileId),
			);
			const updatedFiles = this.filesMetadata().map((f) => f.file);

			this.filesChanged.emit(updatedFiles);
		}
	}

	private validateAndProcessFiles(files: File[]): void {
		if (this.disabled()) {
			return;
		}

		const currentFilesCount = this.filesMetadata().length;
		const remainingSlots = this.maxFiles() - currentFilesCount;

		if (files.length > remainingSlots) {
			this.showToastError(
				`Можно загрузить не более ${this.maxFiles()} файлов`,
			);

			return;
		}

		const config: FileValidationConfig = {
			maxSizeMB: this.maxSize(),
			maxFiles: this.maxFiles(),
		};

		const validFiles: File[] = [];

		for (const file of files) {
			if (!this.allowedFormatsList().includes(file.type as FileFormats)) {
				this.showToastError(
					`Файл ${file.name} имеет недопустимый формат`,
				);
				continue;
			}

			if (!this.validateSize(file, config)) {
				this.showToastError(
					`Файл ${file.name} превышает максимальный размер ${this.maxSize()} MB`,
				);
				continue;
			}

			validFiles.push(file);
		}

		if (validFiles.length === 0) {
			return;
		}

		const newMetadata = validFiles.map((file) => ({
			file,
			id: this.generateId(),
			preview: this.createPreview(file),
		}));

		this.filesMetadata.update((current) => [...current, ...newMetadata]);
		this.filesChanged.emit(this.filesMetadata().map((f) => f.file));
	}

	private generateId(): string {
		return Math.random().toString(36).slice(2, 15);
	}

	protected formatFileSize(size: number): string {
		if (size < 1024) {
			return `${size} B`;
		}

		if (size < 1024 * 1024) {
			return `${(size / 1024).toFixed(1)} KB`;
		}

		return `${(size / (1024 * 1024)).toFixed(1)} MB`;
	}

	private getFilePluralForm(count: number): string {
		if (count % 10 === 1 && count % 100 !== 11) {
			return 'файл';
		}

		if (
			count % 10 >= 2 &&
			count % 10 <= 4 &&
			(count % 100 < 10 || count % 100 > 20)
		) {
			return 'файла';
		}

		return 'файлов';
	}

	private showToastError(message: string): void {
		this.sharedPopupService.openToast({
			text: message,
			type: ToastTypeEnum.Error,
		});
	}

	private createPreview(file: File): string | undefined {
		if (file.type.startsWith('image/') && file.size > 0) {
			return URL.createObjectURL(file);
		}

		return undefined;
	}

	private validateSize(file: File, config: FileValidationConfig): boolean {
		return !(
			config.maxSizeMB && file.size > config.maxSizeMB * 1024 * 1024
		);
	}
}
