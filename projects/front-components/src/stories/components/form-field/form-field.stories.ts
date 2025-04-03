import type { Meta, StoryObj } from '@storybook/angular';
import { FormFieldWrapperComponent } from './form-field-wrapper.component';

/**
 * Метаданные для компонента FormField.
 *
 * @description
 * Определяет конфигурацию и документацию
 * для компонента в Storybook.
 */
const meta: Meta<FormFieldWrapperComponent> = {
	title: 'Components/FormField',
	component: FormFieldWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		label: {
			control: 'text',
			description: 'Текст заголовка поля формы',
			defaultValue: 'Заголовок',
		},
		hint: {
			control: 'text',
			description: 'Текст подсказки для пользователя',
			defaultValue: 'Подсказка',
		},
		showValidation: {
			control: 'boolean',
			description: 'Флаг отображения состояния валидации',
			defaultValue: true,
		},
		showValidationFieldIcon: {
			control: 'boolean',
			description: 'Флаг отображения иконки состояния валидации',
			defaultValue: false,
		},
		errorText: {
			control: 'text',
			description: 'Текст сообщения об ошибке валидации',
			defaultValue: '',
		},
	},
};

export default meta;

type Story = StoryObj<FormFieldWrapperComponent>;

/**
 * Базовый пример использования компонента.
 */
export const Default: Story = {
	args: {
		label: 'Заголовок',
		hint: 'Подсказка',
		showValidation: true,
		showValidationFieldIcon: false,
		errorText: '',
	},
};

/**
 * Пример поля с ошибкой валидации.
 */
export const WithError: Story = {
	args: {
		label: 'Заголовок',
		hint: 'Подсказка',
		showValidation: true,
		showValidationFieldIcon: true,
		errorText: 'Ошибка валидации',
	},
};

/**
 * Пример поля без валидации.
 */
export const WithoutValidation: Story = {
	args: {
		label: 'Заголовок',
		hint: 'Подсказка',
		showValidation: false,
		showValidationFieldIcon: false,
		errorText: '',
	},
};
