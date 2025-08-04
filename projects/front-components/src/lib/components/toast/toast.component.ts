import {
	Component,
	computed,
	DestroyRef,
	inject,
	OnInit,
	signal,
	WritableSignal,
} from '@angular/core';
import { timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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

const TOAST_AUTO_CLOSE_DELAYS = {
	LONG: 10_0000,
	SHORT: 5_0000,
} as const;

interface IToastIconConfig {
	readonly icon: IconType;
	readonly color: Colors;
}

@Component({
	selector: 'ss-lib-toast',
	standalone: true,
	templateUrl: './toast.component.html',
	styleUrls: ['./toast.component.scss'],
	imports: [
		TextComponent,
		IconComponent,
		ButtonComponent,
		CloseButtonComponent,
	],
})
export class ToastComponent implements OnInit {
	private readonly toast = inject(Toast);
	private readonly ref = inject(ToastRef);
	private readonly destroyRef = inject(DestroyRef);

	protected readonly type: WritableSignal<ToastTypeEnum | null> =
		signal(null);

	protected readonly text: WritableSignal<string> = signal('');
	protected readonly mainButton: WritableSignal<ButtonToast | undefined> =
		signal(undefined);

	protected readonly secondaryButton: WritableSignal<
		ButtonToast | undefined
	> = signal(undefined);

	protected readonly isInitialized = signal(false);

	protected readonly iconConfig = computed((): IToastIconConfig => {
		switch (this.type()) {
			case ToastTypeEnum.Error:
				return {
					icon: IconType.Alert,
					color: Colors.IconError,
				};
			case ToastTypeEnum.Success:
				return {
					icon: IconType.CheckCircle,
					color: Colors.IconSuccess,
				};
			default:
				return {
					icon: IconType.ImagePlus,
					color: Colors.IconBodyOnColor,
				};
		}
	});

	protected readonly hasActionButtons = computed(
		(): boolean => !!(this.mainButton() || this.secondaryButton()),
	);

	protected readonly autoCloseDelay = computed((): number =>
		this.hasActionButtons()
			? TOAST_AUTO_CLOSE_DELAYS.LONG
			: TOAST_AUTO_CLOSE_DELAYS.SHORT,
	);

	// Template constants
	protected readonly TextType = TextType;
	protected readonly TextWeight = TextWeight;
	protected readonly IconType = IconType;
	protected readonly Colors = Colors;
	protected readonly ButtonType = ButtonType;
	protected readonly ExtraSize = ExtraSize;
	protected readonly IconPosition = IconPosition;

	public ngOnInit(): void {
		this.initializeToastData();
		this.setupAutoClose();
		this.isInitialized.set(true);
	}

	protected close(): void {
		this.ref.close();
	}

	private initializeToastData(): void {
		this.type.set(this.toast.type);
		this.text.set(this.toast.text);
		this.mainButton.set(this.toast.mainButton);
		this.secondaryButton.set(this.toast.secondaryButton);
	}

	private setupAutoClose(): void {
		timer(this.autoCloseDelay())
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(() => this.close());
	}
}
