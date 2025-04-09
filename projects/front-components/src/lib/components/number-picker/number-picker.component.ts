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
 * Компонент для выбора числового значения с кнопками управления и валидацией
 *
 * @example
 * ```html
 * Параметры:
 *
 * [min]: number - Минимальное значение - необязательный, по умолчанию: 0
 *
 * [max]: number | undefined - Максимальное значение - необязательный,
 * по умолчанию: undefined
 *
 * [step]: number - Шаг изменения значения - необязательный, по умолчанию: 1
 *
 * [disabled]: boolean - Блокировка компонента - необязательный,
 * по умолчанию: false
 *
 * Публичные свойства:
 *
 * numberPickerCtrl: FormControl - Контрол для управления значением
 *
 * isDisabled: Signal<boolean> - Сигнал состояния блокировки
 *
 * ButtonType - Enum типов кнопок
 *
 * IconType - Enum типов иконок
 *
 * IconPosition - Enum позиций иконок
 *
 * Direction - Enum направлений
 *
 * Align - Enum выравниваний
 *
 * InputType - Enum типов инпута
 *
 * Публичные методы:
 *
 * writeValue(value: number | null): void - Запись значения в компонент
 *
 * registerOnChange(fn: (value: number | null) => void): void - Регистрация
 * функции изменения
 *
 * registerOnTouched(fn: () => void): void - Регистрация функции касания
 *
 * setDisabledState(isDisabled: boolean): void - Установка состояния блокировки
 *
 * changeNumberValueByStep(direction: Direction): void - Изменение значения на шаг
 *
 * onCheckInputValueOnFocusout(event: FocusEvent): void - Проверка значения при
 * потере фокуса
 *
 * Примеры использования:
 *
 * <ss-lib-number-picker
 *   [min]="0"
 *   [max]="100"
 *   [step]="1"
 *   [(ngModel)]="value"
 * ></ss-lib-number-picker>
 *
 * <ss-lib-number-picker
 *   [formControl]="numberControl"
 *   [disabled]="false"
 * ></ss-lib-number-picker>
 * ```
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
	public readonly min = input<number>(0);
	public readonly max = input<number | undefined>(undefined);
	public readonly step = input<number>(1);
	public readonly numberPickerCtrl = new FormControl();
	public readonly isDisabled = signal<boolean>(false);
	public readonly ButtonType = ButtonType;
	public readonly IconType = IconType;
	public readonly IconPosition = IconPosition;
	public readonly Direction = Direction;
	public readonly Align = Align;
	public readonly InputType = InputType;
	protected readonly ExtraSize = ExtraSize;
	public onChange: ((value: number | null) => void) | undefined;
	public onTouched: (() => void) | undefined;

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
		this.onChange?.(value);
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
			this.onChange?.(this.min());
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
