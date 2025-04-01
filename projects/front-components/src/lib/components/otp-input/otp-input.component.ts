import {
	afterNextRender,
	ChangeDetectionStrategy,
	Component,
	computed,
	Inject,
	inject,
	Injector,
	input,
	output,
	runInInjectionContext,
	Self,
	signal,
	viewChildren,
} from '@angular/core';
import {
	AbstractControl,
	ControlValueAccessor,
	FormControl,
	FormGroup,
	NgControl,
	ReactiveFormsModule,
	ValidationErrors,
	Validators,
} from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import {
	concat,
	distinctUntilChanged,
	finalize,
	interval,
	map,
	of,
	Subject,
	takeWhile,
	tap,
} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { InputComponent } from '../input/input.component';
import { FormFieldComponent } from '../form-field/form-field.component';
import { FieldCtrlDirective } from '../../core/directives';
import {
	Align,
	Colors,
	ExtraSize,
	IconType,
	InputType,
	TextType,
	TextWeight,
} from '../../shared/models';
import { RepeatTimesPipe } from '../../core/pipes';
import { TextComponent } from '../text/text.component';
import { IconComponent } from '../icon/icon.component';
import { LinkComponent } from '../buttons';
import { NOT_RECEIVED_MSG, RESEND_MSG } from './constants';

function otpValidator(control: AbstractControl): ValidationErrors | null {
	const form = control as FormGroup;
	const values = Object.values(form.value).join('');
	const isValid = /^\d{6}$/.test(values);

	return isValid ? null : { invalidOtp: true };
}

interface OtpForm {
	[key: string]: FormControl<string | null>;
}

@Component({
	selector: 'ss-lib-otp-input',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		FormFieldComponent,
		InputComponent,
		FieldCtrlDirective,
		RepeatTimesPipe,
		TextComponent,
		IconComponent,
		LinkComponent,
	],
	templateUrl: './otp-input.component.html',
	styleUrl: './otp-input.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtpInputComponent implements ControlValueAccessor {
	private readonly injector = inject(Injector);

	public readonly otpInputs = viewChildren('otpInput', {
		read: InputComponent,
	});

	public readonly label = input<string>('Введите код');
	public readonly errorText = input<string>('');
	public readonly resendTime = input<number>(5);
	public readonly otpResendEvent = output<void>();

	public readonly otpForm = new FormGroup<OtpForm>(
		{
			'0': new FormControl<string | null>('', Validators.required),
			'1': new FormControl<string | null>('', Validators.required),
			'2': new FormControl<string | null>('', Validators.required),
			'3': new FormControl<string | null>('', Validators.required),
			'4': new FormControl<string | null>('', Validators.required),
			'5': new FormControl<string | null>('', Validators.required),
		},
		{ validators: otpValidator },
	);

	public readonly startTimer$ = new Subject<void>();

	public readonly timeLeft = toSignal(
		this.startTimer$.pipe(
			tap(() => this.isTimerStarted.set(true)),
			switchMap(() =>
				concat(
					of(this.resendTime()),
					interval(1000).pipe(
						map((tick: number) => this.resendTime() - tick - 1),
						takeWhile((time: number) => time > 0),
						finalize(() => this.isTimerStarted.set(false)),
					),
				),
			),
		),
		{
			injector: this.injector,
			initialValue: this.resendTime(),
		},
	);

	public readonly otpResendTimerText = computed(() => {
		return `Получить новый код через: ${this.timeLeft()} секунд`;
	});

	public readonly isOtpResent = signal(false);
	public readonly isTimerStarted = signal(false);

	private onChange: (value: string | null) => void = () => {};
	private onTouched: () => void = () => {};

	protected readonly resendMsg = RESEND_MSG;
	protected readonly notReceivedMsg = NOT_RECEIVED_MSG;
	protected readonly Colors = Colors;
	protected readonly TextWeight = TextWeight;
	protected readonly TextType = TextType;
	protected readonly IconType = IconType;
	protected readonly ExtraSize = ExtraSize;
	protected readonly InputType = InputType;
	protected readonly Align = Align;

	constructor(
		@Self()
		@Inject(NgControl)
		public ngControl: NgControl,
	) {
		if (this.ngControl) {
			this.ngControl.valueAccessor = this;
		}

		toSignal(
			this.otpForm.valueChanges.pipe(
				tap((values) => {
					this.onValueChange(Object.values(values).join(''));
				}),

				tap(() => {
					if (this.otpForm.hasError('invalidOtp')) {
						this.clearOtpError();
					}
				}),
			),
		);

		afterNextRender(() => {
			this.checkParentCtrlStatus();
		});
	}

	public writeValue(value: string): void {
		if (value && value.length === 6) {
			value.split('').forEach((digit, i) => {
				this.otpForm.get(i.toString())?.setValue(digit);
			});
		}
	}

	public registerOnChange(fn: (value: string | null) => void): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	public setDisabledState(isDisabled: boolean): void {
		isDisabled ? this.otpForm.disable() : this.otpForm.enable();
	}

	public getControl(index: number): FormControl {
		return this.otpForm.get(index.toString()) as FormControl;
	}

	public onInput(index: number): void {
		this.navigateToNext(index, this.otpInputs());
	}

	public onKeyDown(event: KeyboardEvent, index: number): void {
		const inputElement = event.target as HTMLInputElement;

		if (event.key === 'Backspace') {
			if (!inputElement.value && index > 0) {
				this.navigateToPrevious(index, this.otpInputs());
			} else {
				this.getControl(index).setValue('');
				event.preventDefault();
			}
		}
	}

	public onPaste(event: ClipboardEvent): void {
		event.preventDefault();
		const pastedData = event.clipboardData?.getData('text') || '';

		this.pasteOtpValue(this.otpForm, pastedData, this.otpInputs());
	}

	public pasteOtpValue(
		form: FormGroup,
		value: string,
		inputs: readonly InputComponent[],
	): void {
		if (/^\d{6}$/.test(value)) {
			const digits = value.split('');

			digits.forEach((digit, i) => {
				form.get(i.toString())?.setValue(digit);
			});
			inputs[5]?.setFocus();
		}
	}

	public navigateToNext(
		index: number,
		inputs: readonly InputComponent[],
	): void {
		if (index < 5) {
			inputs[index + 1]?.setFocus();
		}
	}

	public navigateToPrevious(
		index: number,
		inputs: readonly InputComponent[],
	): void {
		if (index > 0) {
			this.getControl(index - 1).setValue('');
			inputs[index - 1]?.setFocus();
		}
	}

	public resendCode(): void {
		if (!this.isOtpResent()) {
			this.isOtpResent.set(true);
		}

		this.otpResendEvent.emit();
		this.startTimer$.next();
	}

	private onValueChange(value: string): void {
		if (!value) {
			this.onChange(null);

			return;
		}

		this.onChange(value);
	}

	private checkParentCtrlStatus(): void {
		runInInjectionContext(this.injector, () => {
			toSignal(
				this.ngControl.control!.statusChanges.pipe(
					distinctUntilChanged(),
					tap((status) =>
						status === 'VALID'
							? this.clearOtpError()
							: this.setOtpError(),
					),
				),
			);
		});
	}

	private setOtpError(): void {
		this.otpForm.setErrors({ invalidOtp: true });
		Object.values(this.otpForm.controls).forEach((control) => {
			control.setErrors({ invalidOtp: true });
			control.markAllAsTouched();
		});
	}

	private clearOtpError(): void {
		this.otpForm.setErrors(null);
		Object.values(this.otpForm.controls).forEach((control) => {
			control.setErrors(null);
			control.markAllAsTouched();
		});
	}
}
