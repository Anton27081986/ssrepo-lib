import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	input,
	Optional,
	Self,
} from '@angular/core';
import {
	ControlValueAccessor,
	FormControl,
	FormGroup,
	NgControl,
} from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, tap } from 'rxjs';
import { dateTimePickerImports } from './date-time-picker.imports';
import { DateTimeFormGroup } from '../../shared/models/interfaces/date-time-form-group';
import { FIRST_NATIVE_DAY, LAST_NATIVE_DAY } from '../calendar/constans';

@Component({
	selector: 'ss-lib-date-time-picker',
	imports: [dateTimePickerImports],
	standalone: true,
	templateUrl: './date-time-picker.component.html',
	styleUrl: './date-time-picker.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimePickerComponent implements ControlValueAccessor {
	public min = input<Date>(FIRST_NATIVE_DAY);
	public max = input<Date>(LAST_NATIVE_DAY);

	private date: Date | null = null;
	private time: string | null = null;

	public dateTimeForm: FormGroup<DateTimeFormGroup> = new FormGroup({
		date: new FormControl<Date | null>(null),
		time: new FormControl<string | null>(null),
	});

	private onChange: (value: Date | null) => void = () => {};

	private onTouched: () => void = () => {};

	constructor(
		@Optional() @Self() @Inject(NgControl) public ngControl: NgControl,
	) {
		if (this.ngControl) {
			this.ngControl.valueAccessor = this;
		}

		toSignal(
			this.dateTimeForm.valueChanges.pipe(
				debounceTime(300),
				tap((value) => {
					this.selectedDate(value.date ?? null, value.time ?? null);
				}),
			),
		);
	}

	public get getDate(): FormControl<Date | null> {
		return this.dateTimeForm.controls.date;
	}

	public get getTime(): FormControl<string | null> {
		return this.dateTimeForm.controls.time;
	}

	public writeValue(date: Date | null): void {
		if (date) {
			const calcDate = date;

			const timeStr = calcDate.toTimeString().slice(0, 5);

			this.dateTimeForm.patchValue(
				{
					date: calcDate,
					time: timeStr,
				},
				{ emitEvent: false },
			);
			this.date = calcDate;
			this.time = timeStr;
		} else {
			this.dateTimeForm.reset(
				{ date: null, time: null },
				{ emitEvent: false },
			);
			this.date = null;
			this.time = null;
		}
	}

	public registerOnChange(fn: (value: Date | null) => void): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	public setDisabledState(isDisabled: boolean): void {
		isDisabled
			? this.dateTimeForm.disable()
			: this.dateTimeForm.enable({ emitEvent: false });
	}

	private selectedDate(date: Date | null, time: string | null): void {
		if (date) {
			let selectedDateTime = date;

			if (time) {
				selectedDateTime = new Date(
					date.setHours(
						parseInt(time.split(':')[0], 10),
						parseInt(time.split(':')[1], 10),
					),
				);

				const timeStr = selectedDateTime.toTimeString().slice(0, 5);

				this.getDate.setValue(selectedDateTime, { emitEvent: false });
				this.getTime.setValue(timeStr, { emitEvent: false });
			} else {
				selectedDateTime = new Date(date.setHours(0, 0));
			}

			this.date = selectedDateTime;
			this.time = selectedDateTime.toTimeString().slice(0, 5);
			this.onChange(selectedDateTime);
		} else {
			this.onChange(null);
		}
	}

	protected focusOutDatepicker($event: FocusEvent): void {
		const relatedTarget = $event.relatedTarget as HTMLElement;

		if (
			relatedTarget &&
			$event.currentTarget &&
			($event.currentTarget as HTMLElement).contains(relatedTarget)
		) {
			return;
		}

		if (this.getDate.value === null) {
			this.getDate.setValue(this.date);
		}
	}

	protected focusOutTimePicker($event: FocusEvent): void {
		const relatedTarget = $event.relatedTarget as HTMLElement;

		if (
			relatedTarget &&
			$event.currentTarget &&
			($event.currentTarget as HTMLElement).contains(relatedTarget)
		) {
			return;
		}

		if (this.getTime.value === null || this.getTime.value.trim() === '') {
			this.getTime.setValue(this.time);
		}
	}
}
