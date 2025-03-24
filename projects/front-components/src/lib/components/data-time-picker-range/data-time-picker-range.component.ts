import {
	ChangeDetectionStrategy,
	Component,
	forwardRef,
	input,
	OnDestroy,
} from '@angular/core';
import {
	ControlValueAccessor,
	FormControl,
	FormGroup,
	NG_VALUE_ACCESSOR,
	ReactiveFormsModule,
} from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { DateTimePickerComponent } from '../date-time-picker/date-time-picker.component';
import { TextComponent } from '../text/text.component';
import { DataTimeRange } from '../../shared/models/interfaces/data-time-range';
import { DataTimeRangeFormGroup } from '../../shared/models/interfaces/data-time-range-form-group';
import { FIRST_NATIVE_DAY, LAST_NATIVE_DAY } from '../calendar/constans';

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
	public min = input<Date>(FIRST_NATIVE_DAY);
	public max = input<Date>(LAST_NATIVE_DAY);

	private onChange: (value: DataTimeRange | null) => void = () => {};

	private onTouched: () => void = () => {};

	protected formGroup: FormGroup<DataTimeRangeFormGroup> = new FormGroup({
		start: new FormControl<Date | null>(null),
		end: new FormControl<Date | null>(null),
	});

	constructor() {
		toSignal(
			this.formGroup.valueChanges.pipe(
				tap((value) => {
					const start = value.start;
					const end = value.end;

					this.onChange({
						start: start ?? null,
						end: end ?? null,
					});
				}),
			),
		);
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

	private get controlStart(): FormControl {
		return this.formGroup.controls.start;
	}

	private get controlEnd(): FormControl {
		return this.formGroup.controls.end;
	}
}
