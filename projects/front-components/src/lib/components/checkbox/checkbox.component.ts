import {
	Component,
	computed,
	forwardRef,
	input,
	InputSignal,
	Signal,
	signal,
	WritableSignal,
} from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CheckboxType } from '../../shared/models/types/check-box-type';
import { IconComponent } from '../icon/icon.component';
import { Colors, IconType } from '../../shared/models';

/**
 *
 * Параметры
 *
 * [type]: CheckboxType - тип чекбокса. По умолчанию: 'default'.
 *
 */

@Component({
	selector: 'ss-lib-checkbox',
	standalone: true,
	templateUrl: './checkbox.component.html',
	imports: [IconComponent, NgIf],
	styleUrl: './checkbox.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CheckboxComponent),
			multi: true,
		},
	],
})
export class CheckboxComponent implements ControlValueAccessor {
	protected checked: WritableSignal<boolean> = signal<boolean>(false);
	protected isDisabled: WritableSignal<boolean> = signal<boolean>(false);
	protected isHover: WritableSignal<boolean> = signal<boolean>(false);
	protected isFocus: WritableSignal<boolean> = signal<boolean>(false);
	public type: InputSignal<CheckboxType> = input<CheckboxType>('default');

	protected iconComputed: Signal<IconType> = computed(() => {
		if (this.type() === 'default') {
			return IconType.Check;
		}

		return IconType.Minus;
	});

	public onChange!: (value: boolean | null) => void;
	public onTouched = (): void => {};

	protected readonly IconType = IconType;
	protected readonly Colors = Colors;

	public writeValue(value: boolean | null): void {
		if (value !== null) {
			this.checked.set(value);
		}
	}

	public registerOnChange(fn: (value: boolean | null) => void): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	public setDisabledState?(isDisabled: boolean): void {
		this.isDisabled.set(isDisabled);
	}

	protected toggleCheckbox(): void {
		if (!this.isDisabled()) {
			this.checked.set(!this.checked());
			this.onChange(this.checked());
			this.onTouched();
		}
	}

	protected onMouseEnter(): void {
		this.isHover.set(true);
	}

	protected onMouseLeave(): void {
		this.isHover.set(false);
	}

	protected onFocus(): void {
		this.isFocus.set(false);
	}

	protected onBlur(): void {
		this.isFocus.set(false);
		this.onTouched();
	}
}
