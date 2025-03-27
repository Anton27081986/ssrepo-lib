import {
	ChangeDetectionStrategy,
	Component,
	forwardRef,
	input,
	signal,
} from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, filter, tap } from 'rxjs';
import { datepickerImports } from './datepicker.imports';
import { CalendarDay, DateFormat } from '../calendar/models';
import { fromControlValue, toControlValue } from '../calendar/utils';
import {
	DATE_FILLER_LENGTH,
	FIRST_NATIVE_DAY,
	LAST_NATIVE_DAY,
} from '../calendar/constans';
import { InputType } from '../../shared/models';

/**
 * Параметры:
 *
 * [min]: Date - Минимальная дата для выбора.
 *
 * [max]: Date- Максимальная дата для выбора.
 *
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
	public min = input<Date>(FIRST_NATIVE_DAY);
	public max = input<Date>(LAST_NATIVE_DAY);

	public selectedDate = signal<CalendarDay | null>(null);
	public datepickerCtrl = new FormControl<string | null>(null);
	public readonly InputType = InputType;

	public onChange: (value: Date | null) => void = () => {};
	public onTouched: () => void = () => {};
	constructor() {
		toSignal(
			this.datepickerCtrl.valueChanges.pipe(
				debounceTime(150),
				filter(
					(value) =>
						!value ||
						(!!value && value.length === DATE_FILLER_LENGTH),
				),
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
	}

	private onValueChange(value: string | null): void {
		if (value) {
			this.selectedDate.set(
				CalendarDay.normalizeParse(value, DateFormat.DMY),
			);
			this.onChange(toControlValue(this.selectedDate()));

			return;
		}

		this.onChange(null);
	}
}
