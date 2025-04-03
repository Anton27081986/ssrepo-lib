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
 * Компонент выбора числового значения.
 *
 * Предоставляет интерфейс для ввода числовых значений с возможностью
 * пошагового изменения через кнопки. Реализует ControlValueAccessor
 * для интеграции с Angular Forms.
 *
 * @example
 * ```html
 * <ss-lib-number-picker
 *   [min]="0"
 *   [max]="100"
 *   [step]="1"
 *   [(ngModel)]="value"
 * />
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
	/**
	 * Минимальное значение.
	 *
	 * @default 0
	 * @description
	 * Минимально допустимое значение для ввода.
	 */
	public readonly min = input<number>(0);

	/**
	 * Максимальное значение.
	 *
	 * @default undefined
	 * @description
	 * Максимально допустимое значение для ввода.
	 * Если не указано, ограничение не применяется.
	 */
	public readonly max = input<number | undefined>(undefined);

	/**
	 * Шаг изменения значения.
	 *
	 * @default 1
	 * @description
	 * Значение, на которое изменяется число при
	 * использовании кнопок увеличения/уменьшения.
	 */
	public readonly step = input<number>(1);

	/**
	 * Форм-контрол для управления значением.
	 *
	 * @description
	 * Используется для управления состоянием поля ввода
	 * и интеграции с Angular Forms.
	 */
	public readonly numberPickerCtrl = new FormControl();

	/**
	 * Флаг отключения компонента.
	 *
	 * @description
	 * Определяет, доступен ли компонент для взаимодействия.
	 */
	public readonly isDisabled = signal<boolean>(false);

	/**
	 * Константы для типов кнопок.
	 */
	public readonly ButtonType = ButtonType;

	/**
	 * Константы для типов иконок.
	 */
	public readonly IconType = IconType;

	/**
	 * Константы для позиций иконок.
	 */
	public readonly IconPosition = IconPosition;

	/**
	 * Константы для направлений.
	 */
	public readonly Direction = Direction;

	/**
	 * Константы для выравнивания.
	 */
	public readonly Align = Align;

	/**
	 * Константы для типов ввода.
	 */
	public readonly InputType = InputType;

	/**
	 * Константы для дополнительных размеров.
	 */
	protected readonly ExtraSize = ExtraSize;

	/**
	 * Callback для обновления значения.
	 */
	public onChange: ((value: number | null) => void) | undefined;

	/**
	 * Callback для обработки события касания.
	 */
	public onTouched: (() => void) | undefined;

	/**
	 * Записывает значение в компонент.
	 *
	 * @param value - Значение для установки
	 * @description
	 * Проверяет и корректирует значение в соответствии
	 * с ограничениями min/max.
	 */
	public writeValue(value: number | null): void {
		if (value) {
			const numberValue = this.checkNumberValue(Number(value) || 0);

			return this.numberPickerCtrl.setValue(numberValue, {
				emitEvent: false,
			});
		}
	}

	/**
	 * Регистрирует callback для обновления значения.
	 *
	 * @param fn - Функция обратного вызова
	 */
	public registerOnChange(fn: (value: number | null) => void): void {
		this.onChange = fn;
	}

	/**
	 * Регистрирует callback для обработки касания.
	 *
	 * @param fn - Функция обратного вызова
	 */
	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	/**
	 * Устанавливает состояние disabled.
	 *
	 * @param isDisabled - Флаг отключения
	 */
	public setDisabledState(isDisabled: boolean): void {
		this.isDisabled.set(isDisabled);
	}

	/**
	 * Изменяет значение на указанный шаг.
	 *
	 * @param direction - Направление изменения (увеличение/уменьшение)
	 * @description
	 * Увеличивает или уменьшает текущее значение на
	 * величину шага с учетом ограничений.
	 */
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

	/**
	 * Проверяет значение при потере фокуса.
	 *
	 * @param event - Событие потери фокуса
	 * @description
	 * Устанавливает минимальное значение, если поле
	 * оставлено пустым.
	 */
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

	/**
	 * Проверяет и корректирует числовое значение.
	 *
	 * @param value - Проверяемое значение
	 * @returns Скорректированное значение
	 * @private
	 */
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
