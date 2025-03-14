import {
	ChangeDetectionStrategy,
	Component,
	effect,
	forwardRef,
	input,
	InputSignal,
	signal,
} from '@angular/core';
import {
	type ControlValueAccessor,
	FormControl,
	FormsModule,
	NG_VALUE_ACCESSOR,
	ReactiveFormsModule,
} from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, tap } from 'rxjs';
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
import { SpinnerComponent } from '../spinner/spinner.component';
import { SharedPopupService } from '../../shared/services';

enum States {
	Empty = 'empty',
	Loading = 'loading',
	Preview = 'preview',
}

/**
 * Параметры:
 *
 * [disabled]: boolean - Только для чтения. По умолчанию: `false`
 *
 * [maxSize]: number - Максимальный размер, байт. По умолчанию: `0б`
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
		SpinnerComponent,
		FormsModule,
		ReactiveFormsModule,
	],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => ImageUploadComponent),
			multi: true,
		},
	],
})
export class ImageUploadComponent implements ControlValueAccessor {
	public disabled = input<boolean>(false);
	public maxSize: InputSignal<number> = input<number>(0);

	public maxHeight = input<number>(400);
	public maxWidth = input<number>(400);

	public src = input<string | null>(null);

	public inputCtrl = new FormControl();
	protected hover = signal<boolean>(false);
	protected state = signal<States>(States.Empty);
	protected imageSrc = signal<string | null>(null);

	protected readonly IconType = IconType;
	protected readonly ExtraSize = ExtraSize;
	protected readonly TextType = TextType;
	protected readonly Colors = Colors;
	protected readonly States = States;

	private onChange!: (value: FileList | null) => void;
	private onTouched!: () => void;

	constructor(private readonly sharedPopupService: SharedPopupService) {
		toSignal(
			this.inputCtrl.valueChanges.pipe(
				debounceTime(300),
				tap<FileList | null>((value) => this.onChange(value)),
			),
		);

		effect(() => {
			this.imageSrc.set(this.src());
			this.state.set(States.Preview);
		});
	}

	public writeValue(value: FileList | null): void {
		this.inputCtrl.setValue(value, { emitEvent: false });
	}

	public registerOnChange(fn: (value: FileList | null) => void): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: () => FileList): void {
		this.onTouched = fn;
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
		this.inputCtrl.setValue(null);
		this.state.set(States.Empty);
		this.imageSrc.set(null);
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

		if (file.size > this.maxSize()) {
			this.showToastError('Изображение не соответствует требованиям');
			this.state.set(States.Empty);

			return;
		}

		const img = new Image();

		img.src = URL.createObjectURL(file);

		img.onload = () => {
			const height = img.height;
			const width = img.width;

			if (height > this.maxHeight() || width > this.maxWidth()) {
				this.showToastError('Изображение не соответствует требованиям');
				this.inputCtrl.setValue(null);
				this.state.set(States.Empty);

				return;
			}

			const reader = new FileReader();

			reader.onload = () => {
				this.state.set(States.Preview);
				this.imageSrc.set(
					reader.result ? reader.result.toString() : null,
				);
			};

			reader.readAsDataURL(file);
		};
	}

	private showToastError(text: string): void {
		this.sharedPopupService.openToast({
			text,
			type: ToastTypeEnum.Error,
		});
	}
}
