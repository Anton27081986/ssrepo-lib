import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NumberPickerComponent } from '../../../lib/components/number-picker/number-picker.component';

/**
 * Обертка для компонента NumberPicker.
 *
 * @description
 * Компонент-обертка для демонстрации
 * NumberPicker в Storybook.
 */
@Component({
	selector: 'ss-lib-number-picker-wrapper',
	standalone: true,
	imports: [NumberPickerComponent, ReactiveFormsModule],
	template: `
		<ss-lib-number-picker
			[formControl]="control"
			[min]="min()"
			[max]="max()"
			[step]="step()"
		></ss-lib-number-picker>
	`,
})
export class NumberPickerWrapperComponent {
	/**
	 * Контрол формы для управления значением.
	 *
	 * @description
	 * FormControl для управления значением
	 * компонента NumberPicker.
	 */
	public readonly control = new FormControl<number | null>(null);

	/**
	 * Минимальное значение.
	 *
	 * @default undefined
	 * @description
	 * Минимальное допустимое значение
	 * для выбора.
	 */
	public readonly min = input<number | undefined>(undefined);

	/**
	 * Максимальное значение.
	 *
	 * @default undefined
	 * @description
	 * Максимальное допустимое значение
	 * для выбора.
	 */
	public readonly max = input<number | undefined>(undefined);

	/**
	 * Шаг изменения значения.
	 *
	 * @default 1
	 * @description
	 * Шаг, на который изменяется значение
	 * при нажатии на кнопки увеличения/уменьшения.
	 */
	public readonly step = input<number>(1);
}
