import {
	ChangeDetectionStrategy,
	Component,
	forwardRef,
	signal,
} from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'ss-lib-toggle',
	standalone: true,
	imports: [],
	templateUrl: './toggle.component.html',
	styleUrl: './toggle.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => ToggleComponent),
			multi: true,
		},
	],
})
export class ToggleComponent implements ControlValueAccessor {
	public isDisabled = signal<boolean>(false);
	public checked = signal<boolean>(false);

	public onChange: (value: boolean) => void = () => {};
	public onTouched: () => void = () => {};

	public writeValue(value: boolean | null): void {
		this.checked.set(value ?? false);
	}

	public registerOnChange(fn: (value: boolean) => void): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	public setDisabledState(isDisabled: boolean): void {
		this.isDisabled.set(isDisabled);
	}

	public toggleChecked(): void {
		this.checked.set(!this.checked());
		this.onChange(this.checked());
		this.onTouched();
	}
}
