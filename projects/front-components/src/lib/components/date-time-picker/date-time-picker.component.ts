import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	input,
	OnInit,
	Optional,
	Self,
} from '@angular/core';
import {
	ControlValueAccessor,
	FormGroup,
	FormControl,
	Validators,
	NgControl,
} from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, tap } from 'rxjs';
import { FIRST_NATIVE_DAY, LAST_NATIVE_DAY } from '../calendar/constans';
import { dateTimePickerImports } from './date-time-picker.imports';

@Component({
	selector: 'ss-lib-date-time-picker',
	imports: [dateTimePickerImports],
	templateUrl: './date-time-picker.component.html',
	styleUrl: './date-time-picker.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimePickerComponent implements ControlValueAccessor, OnInit {
	public min = input<Date>(FIRST_NATIVE_DAY);
	public max = input<Date>(LAST_NATIVE_DAY);

	public dateTimeForm: FormGroup = new FormGroup({
		date: new FormControl<Date | null>(null),
		time: new FormControl<string>(''),
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
				tap((value: { date: Date | null; time: string }) => {
					this.selectedDate(value.date, value.time);
				}),
			),
		);
	}

	public ngOnInit(): void {
		this.checkParentValidation();
	}

	public writeValue(date: Date | null): void {
		if (date) {
			const timeStr = date.toTimeString().slice(0, 5);

			this.dateTimeForm.patchValue(
				{
					date,
					time: timeStr,
				},
				{ emitEvent: false },
			);
		} else {
			this.dateTimeForm.reset(null, { emitEvent: false });
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

	private selectedDate(date: Date | null, time: string): void {
		if (date && time) {
			const selectedDateTime = new Date(
				date.setHours(
					parseInt(time.split(':')[0], 10),
					parseInt(time.split(':')[1], 10),
				),
			);

			this.onChange(selectedDateTime);
		} else {
			this.onChange(null);
		}
	}

	private checkParentValidation(): void {
		const control = this.ngControl?.control;

		if (
			!control ||
			!control?.validator ||
			!control.hasValidator(Validators.required)
		) {
			return;
		}

		const { date, time } = this.dateTimeForm.controls;

		date.setValidators(Validators.required);
		time.setValidators(Validators.required);
		this.dateTimeForm.updateValueAndValidity({ emitEvent: false });
	}
}
