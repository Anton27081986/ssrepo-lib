import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import {
	ControlValueAccessor,
	FormControl,
	FormGroup,
	NG_VALUE_ACCESSOR,
	ReactiveFormsModule,
} from '@angular/forms';
import { DataTimeRangeFormGroup } from '../../shared/models/interfaces/data-time-range-form-group';
import { DateTimePickerComponent } from '../date-time-picker/date-time-picker.component';
import { TextComponent } from '../text/text.component';
import { DataTimeRange } from '../../shared/models/interfaces/data-time-range';

@Component({
	selector: 'ss-lib-date-time-picker-range',
	imports: [ReactiveFormsModule, DateTimePickerComponent, TextComponent],
	standalone: true,
	templateUrl: './data-time-picker-range.component.html',
	styleUrl: './data-time-picker-range.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DateTimePickerRangeComponent),
			multi: true,
		},
	],
})
export class DateTimePickerRangeComponent implements ControlValueAccessor {
	private onChange: (value: DataTimeRange | null) => void = () => {};
	private onTouched: () => void = () => {};

	protected formGroup: FormGroup<DataTimeRangeFormGroup> = new FormGroup({
		start: new FormControl<Date | null>(null),
		end: new FormControl<Date | null>(null),
	});

	constructor() {
		this.formGroup.valueChanges.subscribe((value) => {
			if (value.start && value.end) {
				this.onChange({ start: value.start, end: value.end });
				console.log(value);
			}
		});
	}

	public writeValue(data: DataTimeRange | null): void {
		if (data) {
			this.formGroup.setValue({
				start: data.start,
				end: data.end,
			});
		}
	}

	public registerOnChange(fn: (value: DataTimeRange | null) => void): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}
}
