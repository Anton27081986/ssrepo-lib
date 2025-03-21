import {
	ChangeDetectionStrategy,
	Component,
	forwardRef,
	input,
	signal,
} from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import {
	FormControl,
	NG_VALUE_ACCESSOR,
	ReactiveFormsModule,
} from '@angular/forms';
import { InputComponent } from '../input/input.component';
import { FormFieldComponent } from '../form-field/form-field.component';
import {
	Align,
	ButtonType,
	Direction,
	ExtraSize,
	IconPosition,
	IconType,
	InputType,
} from '../../shared/models';
import { FieldCtrlDirective } from '../../core/directives';
import { ButtonComponent } from '../buttons/button/button.component';

/**
 * Параметры:
 *
 * [min]: number | undefined - Мин значение. По умолчанию: `undefined`
 *
 * [max]: number | undefined - Максимальное значение. По умолчанию: `undefined`
 *
 * [step]: number - Шаг. По умолчанию: `1`
 */
@Component({
	selector: 'ss-lib-number-picker',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		FieldCtrlDirective,
		FormFieldComponent,
		InputComponent,
		ButtonComponent,
	],
	templateUrl: './number-picker.component.html',
	styleUrl: './number-picker.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => NumberPickerComponent),
			multi: true,
		},
	],
})
export class NumberPickerComponent implements ControlValueAccessor {
	public min = input<number>(0);
	public max = input<number | undefined>(undefined);
	public step = input<number>(1);

	public numberPickerCtrl = new FormControl();
	public isDisabled = signal<boolean>(false);

	public readonly ButtonType = ButtonType;
	public readonly IconType = IconType;
	public readonly IconPosition = IconPosition;
	public readonly Direction = Direction;
	public readonly Align = Align;
	public readonly InputType = InputType;
	protected readonly ExtraSize = ExtraSize;

	public onChange: (value: number | null) => void = () => {};
	public onTouched: () => void = () => {};

	public writeValue(value: number | null): void {
		if (value) {
			const numberValue = this.checkNumberValue(Number(value) || 0);

			return this.numberPickerCtrl.setValue(numberValue, {
				emitEvent: false,
			});
		}
	}

	public registerOnChange(fn: (value: number | null) => void): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	public setDisabledState(isDisabled: boolean): void {
		this.isDisabled.set(isDisabled);
	}

	public changeNumberValueByStep(direction: Direction): void {
		const currentValue = Number(this.numberPickerCtrl.value) || 0;

		let value: number | null =
			direction === Direction.Next
				? Number((currentValue + this.step()).toFixed(2))
				: Number((currentValue - this.step()).toFixed(2));

		value = this.checkNumberValue(value);

		this.numberPickerCtrl.setValue(value);
		this.onChange(value);
	}

	public onCheckInputValueOnFocusout(event: FocusEvent): void {
		const relatedTarget = event.relatedTarget as HTMLElement;

		if (
			relatedTarget &&
			event.currentTarget &&
			(event.currentTarget as HTMLElement).contains(relatedTarget)
		) {
			return;
		}

		if (!this.numberPickerCtrl.value) {
			this.numberPickerCtrl.setValue(this.min());
			this.onChange(this.min());
		}
	}

	private checkNumberValue(value: number): number {
		if (this.min() !== undefined) {
			if (value && value < this.min()!) {
				return this.min()!;
			}
		}

		if (this.max() !== undefined) {
			if (value && value > this.max()!) {
				return this.max()!;
			}
		}

		return value;
	}
}
