import {
	Component,
	computed,
	forwardRef,
	model,
	ModelSignal,
	Signal,
	signal,
	WritableSignal,
} from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgIf } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { Colors, IconType } from '../../shared/models';

/**
 * Компонент чекбокса с поддержкой различных типов и состояний
 *
 * @example
 * ```html
 * Параметры:
 *
 * [type]: CheckboxType - Тип чекбокса - необязательный,
 * по умолчанию: 'default'
 *
 * <ss-lib-checkbox
 *   [type]="'default'"
 *   [(ngModel)]="isChecked"
 * ></ss-lib-checkbox>
 * ```
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
	protected readonly checked: WritableSignal<boolean> =
		signal<boolean>(false);

	protected readonly isDisabled: WritableSignal<boolean> =
		signal<boolean>(false);

	protected readonly isHover: WritableSignal<boolean> =
		signal<boolean>(false);

	protected readonly isFocus: WritableSignal<boolean> =
		signal<boolean>(false);

	public readonly indeterminate: ModelSignal<boolean> = model(false);

	protected readonly iconComputed: Signal<IconType> = computed(() => {
		if (this.indeterminate()) {
			return IconType.Minus;
		}

		return IconType.Check;
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
			this.indeterminate.set(false);
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
