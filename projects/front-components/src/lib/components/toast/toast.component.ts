import {
	Component,
	OnDestroy,
	OnInit,
	signal,
	WritableSignal,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { TextComponent } from '../text/text.component';
import {
	ButtonToast,
	ButtonType,
	Colors,
	ExtraSize,
	IconPosition,
	IconType,
	TextType,
	TextWeight,
	Toast,
	ToastTypeEnum,
} from '../../shared/models';
import { IconComponent } from '../icon/icon.component';
import { ButtonComponent, CloseButtonComponent } from '../buttons';
import { ToastRef } from './toast-ref';

@Component({
	selector: 'ss-lib-toast',
	templateUrl: './toast.component.html',
	styleUrls: ['./toast.component.scss'],
	imports: [
		TextComponent,
		IconComponent,
		ButtonComponent,
		CloseButtonComponent,
		NgIf,
	],
	standalone: true,
})
export class ToastComponent implements OnInit, OnDestroy {
	protected type: WritableSignal<ToastTypeEnum | null> = signal(null);
	protected text: WritableSignal<string> = signal('');
	protected mainButton: WritableSignal<ButtonToast | undefined> =
		signal(undefined);

	protected secondaryButton: WritableSignal<ButtonToast | undefined> =
		signal(undefined);

	protected readonly TextType = TextType;
	protected readonly TextWeight = TextWeight;
	protected readonly IconType = IconType;
	protected readonly ToastTypeEnum = ToastTypeEnum;
	protected readonly Colors = Colors;
	protected readonly ButtonType = ButtonType;
	protected readonly ExtraSize = ExtraSize;
	protected readonly IconPosition = IconPosition;
	protected initialize = false;

	private timerId = 0;

	constructor(
		private readonly toast: Toast,
		private readonly ref: ToastRef,
	) {
		this.type.set(this.toast.type);
		this.text.set(this.toast.text);
		this.mainButton.set(this.toast.mainButton);
		this.secondaryButton.set(this.toast.secondaryButton);
	}

	public ngOnInit(): void {
		this.initialize = true;

		if (this.mainButton() || this.secondaryButton()) {
			this.timerId = setTimeout(() => this.close(), 10000);
		} else {
			// this.timerId = setTimeout(() => this.close(), 5000);
		}
	}

	public ngOnDestroy(): void {
		clearTimeout(this.timerId);
	}

	protected close(): void {
		this.ref.close();
	}
}
