import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../lib/components/input/input.component';
import { InputType, Align } from '../../../lib/shared/models';

/**
 * Обертка для компонента Input.
 *
 * @description
 * Компонент-обертка для демонстрации
 * Input в Storybook.
 */
@Component({
	selector: 'ss-lib-input-wrapper',
	standalone: true,
	imports: [InputComponent, ReactiveFormsModule],
	template: `
		<ss-lib-input
			[formControl]="control"
			[type]="type()"
			[placeholder]="placeholder()"
			[readOnly]="readOnly()"
			[align]="align()"
			[min]="min()"
			[max]="max()"
		></ss-lib-input>
	`,
})
export class InputWrapperComponent {
	/**
	 * Контрол формы для демонстрации.
	 *
	 * @description
	 * FormControl для управления значением
	 * поля ввода.
	 */
	public readonly control = new FormControl<string | null>(null);

	/**
	 * Тип поля ввода.
	 *
	 * @default InputType.Text
	 * @description
	 * Определяет тип вводимых данных
	 * (text, number, date, time).
	 */
	public readonly type = input<InputType>(InputType.Text);

	/**
	 * Текст подсказки.
	 *
	 * @default ''
	 * @description
	 * Текст, отображаемый в пустом поле.
	 */
	public readonly placeholder = input<string>('');

	/**
	 * Флаг только для чтения.
	 *
	 * @default false
	 * @description
	 * Определяет, можно ли редактировать
	 * поле.
	 */
	public readonly readOnly = input<boolean>(false);

	/**
	 * Выравнивание текста.
	 *
	 * @default Align.Start
	 * @description
	 * Определяет выравнивание текста
	 * в поле.
	 */
	public readonly align = input<Align>(Align.Start);

	/**
	 * Минимальное значение.
	 *
	 * @default undefined
	 * @description
	 * Минимальное допустимое значение
	 * для поля.
	 */
	public readonly min = input<unknown | undefined>(undefined);

	/**
	 * Максимальное значение.
	 *
	 * @default undefined
	 * @description
	 * Максимальное допустимое значение
	 * для поля.
	 */
	public readonly max = input<unknown | undefined>(undefined);
}
