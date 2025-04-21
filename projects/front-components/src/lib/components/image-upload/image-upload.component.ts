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
import { interval, map, Subject, take, takeUntil } from 'rxjs';
import { TextComponent } from '../text/text.component';
import { ButtonComponent, PreviewButtonComponent } from '../buttons';
import {
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
 * Состояния компонента загрузки изображения.
 */
enum States {
	Empty = 'empty',
	Loading = 'loading',
	Preview = 'preview',
}

/**
 * Компонент загрузки изображений.
 *
 * Предоставляет интерфейс для загрузки изображений с поддержкой
 * drag-and-drop, предпросмотра и валидации размеров. Поддерживает
 * различные состояния загрузки и отображение прогресса.
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
	public readonly maxSize = input<number>(0);
	public readonly maxHeight = input<number>(0);
	public readonly maxWidth = input<number>(0);
	public readonly progress = input<number>(0);
	public readonly src = input<string | null>(null);
	public readonly fileChanged = output<File | null>();
	public readonly uploadCancel = output();

	public readonly animProgress = signal<number>(0);
	protected readonly hover = signal<boolean>(false);
	protected readonly state = signal<States>(States.Empty);
	protected readonly imageSrc = signal<string | null>(null);

	protected backgroundImg = computed(() => {
		const src = this.imageSrc();

		return src ? `url(${src})` : '';
	});

	protected readonly IconType = IconType;
	protected readonly ExtraSize = ExtraSize;
	protected readonly TextType = TextType;
	protected readonly Colors = Colors;
	protected readonly States = States;
	protected readonly subjectCancel = new Subject<unknown>();

	constructor(private readonly sharedPopupService: SharedPopupService) {
		effect(() => {
			if (this.src()) {
				this.imageSrc.set(this.src());
				this.state.set(States.Preview);
			}
		});

		effect(() => {
			if (this.progress()) {
				this.state.set(States.Loading);

				const numbers$ = interval(10).pipe(
					map((i) => i + 1),
					take(110),
					takeUntil(this.subjectCancel),
				);

				numbers$.subscribe({
					next: (number) => this.animProgress.set(number),
					complete: () => {
						if (this.progress() === 100) {
							this.state.set(States.Preview);
						}

						this.animProgress.set(0);
					},
				});
			}
		});
	}

	protected onDragEnter(event: Event): void {
		event.preventDefault();

		if (this.disabled()) {
			return;
		}

		this.hover.set(true);
	}

	protected onDragLeave(event: Event): void {
		event.preventDefault();
		this.hover.set(false);
	}

	protected onDropSuccess(event: DragEvent): void {
		event.preventDefault();

		if (
			event.dataTransfer &&
			event.dataTransfer.files &&
			event.dataTransfer.files.length > 0
		) {
			this.onFileChange(event.dataTransfer.files);
		}
	}

	protected onFileDelete(): void {
		this.uploadCancel.emit();
		this.subjectCancel.next(false);
		this.animProgress.set(0);
		this.state.set(States.Empty);
	}

	protected selectFromPC(event: Event): void {
		const inputCtrl = event.target as HTMLInputElement;

		if (inputCtrl.files) {
			this.onFileChange(inputCtrl.files);
		}
	}

	protected onFileChange(files: FileList): void {
		if (this.disabled()) {
			return;
		}

		const file = files[0];

		if (!file) {
			return;
		}

		this.state.set(States.Loading);

		if (this.maxSize() && file.size > this.maxSize() * 1024 * 1024) {
			this.showToastError('Изображение не соответствует требованиям');
			this.state.set(States.Empty);

			return;
		}

		const img = new Image();

		img.src = URL.createObjectURL(file);

		img.onload = () => {
			const height = img.height;
			const width = img.width;

			if (
				(this.maxHeight() && height > this.maxHeight()) ||
				(this.maxWidth() && width > this.maxWidth())
			) {
				this.showToastError('Изображение не соответствует требованиям');
				this.state.set(States.Empty);

				return;
			}

			const reader = new FileReader();

			reader.onload = () => {
				this.imageSrc.set(
					reader.result ? reader.result.toString() : null,
				);
			};

			reader.readAsDataURL(file);

			this.fileChanged.emit(file || null);
		};
	}

	private showToastError(text: string): void {
		this.sharedPopupService.openToast({
			text,
			type: ToastTypeEnum.Error,
		});
	}
}
