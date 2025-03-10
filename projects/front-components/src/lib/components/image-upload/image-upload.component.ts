import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
	signal
} from '@angular/core';
import { TextComponent } from '../text/text.component';
import {
	ButtonComponent,
	PreviewButtonComponent,
	UtilityButtonComponent,
} from '../buttons';
import { Colors, ExtraSize, IconType, TextType } from '../../shared/models';
import { BadgeInfoComponent } from '../badge-info/badge-info.component';
import { BadgeComponent } from '../badge/badge.component';
import {SpinnerComponent} from '../spinner/spinner.component';

enum States {
	Empty = 'empty',
	Loading = 'loading',
	Preview = 'preview',
}

@Component({
	selector: 'ss-lib-image-upload',
	templateUrl: './image-upload.component.html',
	styleUrls: ['./image-upload.component.scss'],
	imports: [
		TextComponent,
		ButtonComponent,
		BadgeInfoComponent,
		BadgeComponent,
		UtilityButtonComponent,
		PreviewButtonComponent,
		SpinnerComponent,
	],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUploadComponent {
	public disabled = input<boolean>(false);
	public imageChanged = output<File | null>();
	protected hover = signal<boolean>(false);
	protected state = signal<States>(States.Empty);
	protected imageSrc = signal<ArrayBuffer | string | null>(null);

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

	protected onChange(event: Event): void {
		const input: HTMLInputElement = event.target as HTMLInputElement;

		if (input && input.files && input.files.length) {
			this.onFileChange(input.files);
		}
	}

	protected onFileDelete(): void {
		this.state.set(States.Empty);
		this.imageSrc.set(null);
		this.imageChanged.emit(null);
	}

	private onFileChange(files: FileList): void {
		if (this.disabled()) {
			return;
		}

		this.state.set(States.Loading) ;

		const file = files[0];

		const reader = new FileReader();

		reader.onload = () => {
			this.state.set(States.Preview);
			this.imageSrc.set(reader.result);
		};

		reader.readAsDataURL(file);

		this.imageChanged.emit(files[0]);
	}

	protected readonly IconType = IconType;
	protected readonly ExtraSize = ExtraSize;
	protected readonly TextType = TextType;
	protected readonly Colors = Colors;
	protected readonly States = States;
}
