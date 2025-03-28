import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../../lib/components/form-field/form-field.component';
import { InputComponent } from '../../../lib/components/input/input.component';

/**
 * Обертка для компонента FormField.
 *
 * @description
 * Компонент-обертка для демонстрации
 * FormField в Storybook.
 */
@Component({
	selector: 'ss-lib-form-field-wrapper',
	standalone: true,
	imports: [FormFieldComponent, ReactiveFormsModule, InputComponent],
	template: `
		<ss-lib-form-field
			[label]="label()"
			[hint]="hint()"
			[showValidation]="showValidation()"
			[showValidationFieldIcon]="showValidationFieldIcon()"
			[errorText]="errorText()"
		>
			<ss-lib-input
				[formControl]="control"
				[placeholder]="'Введите значение'"
			></ss-lib-input>
		</ss-lib-form-field>
	`,
})
export class FormFieldWrapperComponent {
	/**
	 * Контрол формы для демонстрации.
	 *
	 * @description
	 * FormControl для демонстрации
	 * валидации поля.
	 */
	public readonly control = new FormControl('', { validators: [] });

	/**
	 * Текст заголовка поля.
	 *
	 * @default ''
	 * @description
	 * Текст, отображаемый над полем ввода.
	 */
	public readonly label = input<string>('');

	/**
	 * Текст подсказки.
	 *
	 * @default ''
	 * @description
	 * Текст подсказки, отображаемый под полем.
	 */
	public readonly hint = input<string>('');

	/**
	 * Флаг отображения валидации.
	 *
	 * @default true
	 * @description
	 * Определяет, отображать ли состояние
	 * валидации поля.
	 */
	public readonly showValidation = input<boolean>(true);

	/**
	 * Флаг отображения иконки валидации.
	 *
	 * @default false
	 * @description
	 * Определяет, отображать ли иконку
	 * состояния валидации.
	 */
	public readonly showValidationFieldIcon = input<boolean>(false);

	/**
	 * Текст ошибки.
	 *
	 * @default ''
	 * @description
	 * Текст, отображаемый при ошибке
	 * валидации.
	 */
	public readonly errorText = input<string>('');
}
