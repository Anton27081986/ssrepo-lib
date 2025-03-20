import type { Meta, StoryObj } from '@storybook/angular';
import { FormFieldWrapperComponent } from './form-field-wrapper.component';

const meta: Meta<FormFieldWrapperComponent> = {
	title: 'Components/FormField',
	component: FormFieldWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		label: {
			control: 'text',
			description: 'Заголовок поля',
			defaultValue: 'Заголовок',
		},
		hint: {
			control: 'text',
			description: 'Подсказка',
			defaultValue: 'Подсказка',
		},
		showValidation: {
			control: 'boolean',
			description: 'Отображать валидацию',
			defaultValue: true,
		},
		showValidationFieldIcon: {
			control: 'boolean',
			description: 'Отображать иконку валидации',
			defaultValue: false,
		},
		errorText: {
			control: 'text',
			description: 'Текст ошибки',
			defaultValue: '',
		},
	},
};

export default meta;

type Story = StoryObj<FormFieldWrapperComponent>;

export const Default: Story = {
	args: {
		label: 'Заголовок',
		hint: 'Подсказка',
		showValidation: true,
		showValidationFieldIcon: false,
		errorText: '',
	},
};

export const WithError: Story = {
	args: {
		label: 'Заголовок',
		hint: 'Подсказка',
		showValidation: true,
		showValidationFieldIcon: true,
		errorText: 'Ошибка валидации',
	},
};

export const WithoutValidation: Story = {
	args: {
		label: 'Заголовок',
		hint: 'Подсказка',
		showValidation: false,
		showValidationFieldIcon: false,
		errorText: '',
	},
};
