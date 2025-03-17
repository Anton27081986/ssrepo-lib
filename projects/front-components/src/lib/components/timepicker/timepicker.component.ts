import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import {
	ControlValueAccessor,
	FormControl,
	NG_VALUE_ACCESSOR,
	ReactiveFormsModule,
} from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, tap } from 'rxjs';
import { TIME_INTERVALS } from './constants/time';
import { DropdownItemComponent } from '../dropdown-item/dropdown-item.component';
import { DropdownListComponent } from '../dropdown-list/dropdown-list.component';
import { SelectComponent } from '../select/select.component';
import { IconType } from '../../shared/models';
import { PopoverTriggerForDirective } from '../../core/directives';

@Component({
	selector: 'ss-lib-timepicker',
	imports: [
		DropdownItemComponent,
		DropdownListComponent,
		SelectComponent,
		ReactiveFormsModule,
		PopoverTriggerForDirective,
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
	public timepickerCtrl = new FormControl<string | null>(null);

	protected readonly timeIntervals = TIME_INTERVALS;
	protected readonly IconType = IconType;

	private onChange: (value: string | null) => void = () => {};
	private onTouched: () => void = () => {};

	constructor() {
		toSignal(
			this.timepickerCtrl.valueChanges.pipe(
				debounceTime(150),
				tap((value) => this.onChange(value)),
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
}
