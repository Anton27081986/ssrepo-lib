import {
	Component,
	OnDestroy,
	OnInit,
	signal,
	WritableSignal,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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

	private readonly destroy$ = new Subject<void>();

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
		timer(10)
			.pipe(takeUntil(this.destroy$))
			.subscribe(() => {
				this.initialize = true;
			});

		const autoCloseDelay =
			this.mainButton() || this.secondaryButton() ? 10000 : 5000;

		timer(autoCloseDelay)
			.pipe(takeUntil(this.destroy$))
			.subscribe(() => this.close());
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	protected close(): void {
		this.ref.close();
	}
}
