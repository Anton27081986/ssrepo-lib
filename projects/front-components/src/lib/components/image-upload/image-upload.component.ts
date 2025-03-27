import {
	ChangeDetectionStrategy,
	Component,
	effect,
	input,
	output,
	signal,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

enum States {
	Empty = 'empty',
	Loading = 'loading',
	Preview = 'preview',
}

/**
 * Параметры:
 *
 * (fileChanged): Function - Функция, которая отрабатывает в момент загрузки файла и принимает параметр File | null
 *
 * [src]: string - Адрес изображения. По умолчанию: `null`
 *
 * [progress]: number - Процент загрузки. По умолчанию: `0`
 *
 * [disabled]: boolean - Только для чтения. По умолчанию: `false`
 *
 * [maxSize]: number - Максимальный размер, Мбайт. По умолчанию: `0Мб`
 *
 * [maxHeight]: number - Минимальная высота, px. По умолчанию: `0px`
 *
 * [maxWidth]: number - Максимальная ширина, px. По умолчанию: `0px`
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
	],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUploadComponent {
	public disabled = input<boolean>(false);
	public maxSize = input<number>(0);

	public maxHeight = input<number>(0);
	public maxWidth = input<number>(0);

	public progress = input<number>(50);

	public src = input<string | null>(null);

	public fileChanged = output<File | null>();

	protected hover = signal<boolean>(false);
	protected state = signal<States>(States.Empty);

	protected readonly IconType = IconType;
	protected readonly ExtraSize = ExtraSize;
	protected readonly TextType = TextType;
	protected readonly Colors = Colors;
	protected readonly States = States;

	constructor(private readonly sharedPopupService: SharedPopupService) {
		effect(() => {
			if (this.src()) {
				this.state.set(States.Preview);
			} else {
				this.state.set(States.Empty);
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
		this.fileChanged.emit(null);
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
