import {
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	input,
	output,
	signal,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { finalize, interval, map, Subject, take, takeUntil, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs/operators';
import { TextComponent } from '../text/text.component';
import { ButtonComponent, PreviewButtonComponent } from '../buttons';
import {
	ButtonType,
	Colors,
	ExtraSize,
	IconType,
	TextType,
	ToastTypeEnum,
} from '../../shared/models';
import { BadgeComponent } from '../badge/badge.component';
import { SharedPopupService } from '../../shared/services';
import { ProgressCircleComponent } from '../progress-circle/progress-circle.component';
import { SafePipe } from '../../core/pipes';

/**
 * Enum representing the states of the image upload component.
 */
enum States {
	Empty = 'empty',
	Loading = 'loading',
	Preview = 'preview',
}

/**
 * Interface for image validation configuration.
 */
interface ImageValidationConfig {
	maxSizeMB: number;
	maxWidth: number;
	maxHeight: number;
}

/**
 * Image upload component with drag-and-drop, preview, and validation support.
 *
 * @example
 * ```html
 * <ss-lib-image-upload
 *   [disabled]="false"
 *   [maxSize]="5"
 *   [maxHeight]="800"
 *   [maxWidth]="1200"
 *   [progress]="uploadProgress"
 *   [src]="imageUrl"
 *   (fileChanged)="onFileChange($event)"
 *   (uploadCancel)="onUploadCancel()"
 * />
 * ```
 */
@Component({
	selector: 'ss-lib-image-upload',
	templateUrl: './image-upload.component.html',
	styleUrls: ['./image-upload.component.scss'],
	imports: [
		TextComponent,
		ButtonComponent,
		BadgeComponent,
		PreviewButtonComponent,
		FormsModule,
		ReactiveFormsModule,
		ProgressCircleComponent,
		SafePipe,
	],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUploadComponent {
	public readonly disabled = input<boolean>(false);
	public readonly maxSize = input<number>(0); // Max size in MB
	public readonly maxHeight = input<number>(0);
	public readonly maxWidth = input<number>(0);
	public readonly progress = input<number>(0);
	public readonly src = input<string | null>(null);

	public readonly fileChanged = output<File | null>();
	public readonly uploadCancel = output<void>();

	protected readonly animProgress = signal<number>(0);
	protected readonly hover = signal<boolean>(false);
	protected readonly state = signal<States>(States.Empty);
	protected readonly imageSrc = signal<string | null>(null);
	private readonly loadingStart = new Subject<void>();
	private readonly loadingCancel = new Subject<void>();

	protected readonly backgroundImg = computed(() => {
		const src = this.imageSrc();

		return src ? `url(${src})` : '';
	});

	protected readonly maxResolutionText = computed(() => {
		const width = this.maxWidth() || 'неограничено';
		const height = this.maxHeight() || 'неограничено';

		if (width === 'неограничено' && height === 'неограничено') {
			return 'PNG, SVG, JPEG (макс. разрешение неограничено)';
		}

		return `PNG, SVG, JPEG (макс. разрешение ${width}x${height} px)`;
	});

	protected readonly IconType = IconType;
	protected readonly ExtraSize = ExtraSize;
	protected readonly TextType = TextType;
	protected readonly Colors = Colors;
	protected readonly States = States;
	protected readonly ButtonType = ButtonType;

	constructor(private readonly sharedPopupService: SharedPopupService) {
		// Effect for handling src changes
		effect(() => {
			const src = this.src();

			if (src) {
				this.imageSrc.set(src);
				this.state.set(States.Preview);
			}
		});

		// Effect for handling progress updates
		effect(() => {
			const progress = this.progress();

			if (progress > 0) {
				this.state.set(States.Loading);
				this.loadingStart.next();
			}
		});

		toSignal(
			this.loadingStart.pipe(
				switchMap(() =>
					interval(10).pipe(
						map((value) => value),
						tap((value: number) => this.animProgress.set(value)),
						take(110),
						takeUntil(this.loadingCancel),
						finalize(() => {
							if (this.progress() === 100) {
								this.state.set(States.Preview);
							}

							this.animProgress.set(0);
						}),
					),
				),
			),
			{ initialValue: null },
		);
	}

	/**
	 * Handles drag enter event.
	 */
	protected onDragEnter(event: DragEvent): void {
		event.preventDefault();

		if (!this.disabled()) {
			this.hover.set(true);
		}
	}

	/**
	 * Handles drag leave event.
	 */
	protected onDragLeave(event: DragEvent): void {
		event.preventDefault();
		this.hover.set(false);
	}

	/**
	 * Handles successful drop event.
	 */
	protected onDropSuccess(event: DragEvent): void {
		event.preventDefault();
		this.hover.set(false);

		const files = event.dataTransfer?.files;

		if (files && files.length > 0) {
			this.validateAndProcessFile(files[0]);
		}
	}

	/**
	 * Handles file selection from input.
	 */
	protected onFileSelect(files: FileList | null): void {
		if (files && files.length > 0) {
			this.validateAndProcessFile(files[0]);
		}
	}

	/**
	 * Handles file deletion or cancellation.
	 */
	protected onFileDelete(): void {
		this.uploadCancel.emit();
		this.loadingCancel.next();
		this.animProgress.set(0);
		this.state.set(States.Empty);
	}

	/**
	 * Validates and processes the selected file.
	 */
	private validateAndProcessFile(file: File): void {
		if (this.disabled()) {
			return;
		}

		const config: ImageValidationConfig = {
			maxSizeMB: this.maxSize(),
			maxWidth: this.maxWidth(),
			maxHeight: this.maxHeight(),
		};

		// Validate file size
		if (!this.validateSize(file, config)) {
			this.handleValidationError(
				'Изображение не соответствует требованиям',
			);

			return;
		}

		const img = new Image();
		const objectUrl = URL.createObjectURL(file);

		img.onload = () => {
			const valid = this.validateDimensions(
				img.width,
				img.height,
				config,
			);

			URL.revokeObjectURL(objectUrl);

			if (!valid) {
				this.handleValidationError(
					'Изображение не соответствует требованиям',
				);

				return;
			}

			this.readFile(file);
		};

		img.onerror = () => {
			URL.revokeObjectURL(objectUrl);
			this.handleValidationError(
				'Изображение не соответствует требованиям',
			);
		};

		img.src = objectUrl;
	}

	private validateSize(file: File, config: ImageValidationConfig): boolean {
		return !(
			config.maxSizeMB && file.size > config.maxSizeMB * 1024 * 1024
		);
	}

	private validateDimensions(
		width: number,
		height: number,
		config: ImageValidationConfig,
	): boolean {
		return !(
			(config.maxWidth && width > config.maxWidth) ||
			(config.maxHeight && height > config.maxHeight)
		);
	}

	private handleValidationError(message: string): void {
		this.showToastError(message);
		this.state.set(States.Empty);
	}

	private readFile(file: File): void {
		const reader = new FileReader();

		reader.onload = () => {
			this.imageSrc.set(reader.result as string | null);
			this.fileChanged.emit(file);
		};

		reader.readAsDataURL(file);
	}

	/**
	 * Displays an error toast message.
	 */
	private showToastError(message: string): void {
		this.sharedPopupService.openToast({
			text: message,
			type: ToastTypeEnum.Error,
		});
	}
}
