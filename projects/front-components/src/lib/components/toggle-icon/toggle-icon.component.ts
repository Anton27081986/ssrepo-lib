import {
	ChangeDetectionStrategy,
	Component,
	computed,
	forwardRef,
	input,
	signal,
} from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Colors, IconType } from '../../shared/models';
import { IconComponent } from '../icon/icon.component';

@Component({
	selector: 'ss-lib-toggle-icon',
	standalone: true,
	imports: [IconComponent],
	templateUrl: './toggle-icon.component.html',
	styleUrl: './toggle-icon.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => ToggleIconComponent),
			multi: true,
		},
	],
})
export class ToggleIconComponent implements ControlValueAccessor {
	public iconFalse = input<IconType | null>(IconType.Moon);
	public iconTrue = input<IconType | null>(IconType.Sun);

	public toggleIcon = computed(() =>
		this.checked() ? this.iconTrue() : this.iconFalse(),
	);

	public checked = signal<boolean>(false);

	public readonly Colors = Colors;

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

	public toggleChecked(): void {
		this.checked.set(!this.checked());
		this.onChange(this.checked());
		this.onTouched();
	}
}
