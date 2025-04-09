import {
	ChangeDetectionStrategy,
	Component,
	forwardRef,
	viewChild,
} from '@angular/core';
import {
	ControlValueAccessor,
	FormControl,
	NG_VALUE_ACCESSOR,
	ReactiveFormsModule,
} from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { TIME_INTERVALS } from './constants/time';
import { DropdownItemComponent } from '../dropdown-item/dropdown-item.component';
import { DropdownListComponent } from '../dropdown-list/dropdown-list.component';
import { IconType, InputType } from '../../shared/models';
import { PopoverTriggerForDirective } from '../../core/directives';
import { InputComponent } from '../input/input.component';

/**
 * Компонент выбора времени с поддержкой форм и предустановленных интервалов
 *
 * @example
 * ```html
 * Параметры:
 *
 * [(ngModel)]: string | null - Значение времени в формате HH:MM - обязательный
 *
 * [formControl]: FormControl<string | null> - Контрол формы - обязательный
 *
 * [disabled]: boolean - Блокировка компонента - необязательный, по умолчанию: false
 *
 * <ss-lib-timepicker
 *   [(ngModel)]="selectedTime"
 *   [disabled]="false"
 * ></ss-lib-timepicker>
 *
 * <ss-lib-timepicker
 *   [formControl]="timeControl"
 * ></ss-lib-timepicker>
 * ```
 */
@Component({
	selector: 'ss-lib-timepicker',
	standalone: true,
	imports: [
		DropdownItemComponent,
		DropdownListComponent,
		ReactiveFormsModule,
		PopoverTriggerForDirective,
		InputComponent,
	],
	templateUrl: './timepicker.component.html',
	styleUrl: './timepicker.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TimepickerComponent),
			multi: true,
		},
	],
})
export class TimepickerComponent implements ControlValueAccessor {
	private readonly timeInput = viewChild('timeInput', {
		read: InputComponent,
	});

	public timepickerCtrl = new FormControl<string | null>(null);

	protected readonly timeIntervals = TIME_INTERVALS;
	protected readonly IconType = IconType;
	protected readonly InputType = InputType;

	private onChange: (value: string | null) => void = () => {};
	private onTouched: () => void = () => {};

	constructor() {
		toSignal(
			this.timepickerCtrl.valueChanges.pipe(
				tap((value) => {
					this.onChange(value);
				}),
			),
		);
	}

	public writeValue(value: string | null): void {
		this.timepickerCtrl.setValue(value, { emitEvent: false });
	}

	public registerOnChange(fn: (value: string | null) => void): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	public setDisabledState(isDisabled: boolean): void {
		if (isDisabled) {
			this.timepickerCtrl.disable();
		} else {
			this.timepickerCtrl.enable();
		}
	}

	public selectTime(time: string): void {
		this.timepickerCtrl.setValue(time);

		this.timeInput()?.setFocus();
	}
}
