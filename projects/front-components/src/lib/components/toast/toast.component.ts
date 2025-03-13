import {
	Component,
	OnDestroy,
	OnInit,
	signal,
	WritableSignal,
} from '@angular/core';
import {
	animate,
	state,
	style,
	transition,
	trigger,
	AnimationEvent,
} from '@angular/animations';
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
	ToastAnimationState,
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
	animations: [
		trigger('fadeAnimation', [
			state('default', style({ opacity: 1 })),
			transition('void => *', [
				style({ opacity: 0 }),
				animate('{{ fadeIn }}ms'),
			]),
			transition(
				'default => closing',
				animate('{{ fadeOut }}ms', style({ opacity: 0 })),
			),
		]),
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
	protected animationState: ToastAnimationState = 'default';

	private intervalId = 0;

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
		if (this.mainButton() || this.secondaryButton()) {
			this.intervalId = setTimeout(() => this.close(), 10000);
		} else {
			this.intervalId = setTimeout(() => this.close(), 5000);
		}
	}

	public ngOnDestroy(): void {
		clearInterval(this.intervalId);
	}

	protected close(): void {
		this.ref.close();
	}

	protected onFadeFinished(event: AnimationEvent): void {
		const { toState } = event;
		const isFadeOut = (toState as ToastAnimationState) === 'closing';
		const itFinished = this.animationState === 'closing';

		if (isFadeOut && itFinished) {
			this.close();
		}
	}
}
