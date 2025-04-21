import {
	ChangeDetectionStrategy,
	Component,
	forwardRef,
	input,
	signal,
	viewChild,
} from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, tap } from 'rxjs';
import { datepickerImports } from './datepicker.imports';
import { CalendarDay, DateFormat } from '../calendar/models';
import { fromControlValue, toControlValue } from '../calendar/utils';
import {
	DATE_FILLER_LENGTH,
	FIRST_NATIVE_DAY,
	LAST_NATIVE_DAY,
} from '../calendar/constans';
import { InputType } from '../../shared/models';
import { InputComponent } from '../input/input.component';

/**
 * Компонент выбора даты с поддержкой календаря и валидации
 *
 * @example
 * ```html
 * Параметры:
 *
 * [min]: Date - Минимальная дата для выбора - необязательный,
 * по умолчанию: FIRST_NATIVE_DAY
 *
 * [max]: Date - Максимальная дата для выбора - необязательный,
 * по умолчанию: LAST_NATIVE_DAY
 *
 * <ss-lib-datepicker
 *   [min]="new Date('2024-01-01')"
 *   [max]="new Date('2024-12-31')"
 *   [(ngModel)]="selectedDate"
 * ></ss-lib-datepicker>
 * ```
 */
@Component({
	selector: 'ss-lib-datepicker',
	standalone: true,
	imports: [datepickerImports],
	templateUrl: './datepicker.component.html',
	styleUrl: './datepicker.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DatepickerComponent),
			multi: true,
		},
	],
})
export class DatepickerComponent implements ControlValueAccessor {
	private readonly dateInput = viewChild('dateInput', {
		read: InputComponent,
	});

	public min = input<Date>(FIRST_NATIVE_DAY);
	public max = input<Date>(LAST_NATIVE_DAY);

	public selectedDate = signal<CalendarDay | null>(null);
	public datepickerCtrl = new FormControl<string | null>(null);
	public readonly InputType = InputType;
	protected readonly firstNativeDay = FIRST_NATIVE_DAY;
	protected readonly lastNativeDay = LAST_NATIVE_DAY;

	public onChange: (value: Date | null) => void = () => {};
	public onTouched: () => void = () => {};

	constructor() {
		toSignal(
			this.datepickerCtrl.valueChanges.pipe(
				debounceTime(150),
				tap((value) => this.onValueChange(value!)),
			),
		);
	}

	public writeValue(value: Date | null): void {
		const convertedToCalendarDay = value ? fromControlValue(value) : null;

		this.selectedDate.set(convertedToCalendarDay);
		this.datepickerCtrl.setValue(
			convertedToCalendarDay?.toString() || null,
			{
				emitEvent: false,
			},
		);
	}

	public registerOnChange(fn: (value: Date | null) => void): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	public setDisabledState(isDisabled: boolean): void {
		isDisabled
			? this.datepickerCtrl.disable()
			: this.datepickerCtrl.enable({ emitEvent: false });
	}

	public onDateSelected(date: CalendarDay | null): void {
		this.selectedDate.set(date);

		this.datepickerCtrl.setValue(date?.toString() || null, {
			emitEvent: false,
		});

		this.onChange(toControlValue(date));
		this.onTouched();
		this.dateInput()?.setFocus();
	}

	private onValueChange(value: string | null): void {
		if (!value || (!!value && value.length !== DATE_FILLER_LENGTH)) {
			this.onChange(null);

			return;
		}

		this.selectedDate.set(
			CalendarDay.normalizeParse(value, DateFormat.DMY),
		);

		this.onChange(toControlValue(this.selectedDate()));
	}
}
