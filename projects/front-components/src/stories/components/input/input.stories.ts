import type { Meta, StoryObj } from '@storybook/angular';
import { InputWrapperComponent } from './input-wrapper.component';
import { InputType, Align } from '../../../lib/shared/models';

/**
 * Метаданные для компонента Input.
 *
 * @description
 * Определяет конфигурацию и документацию
 * для компонента в Storybook.
 */
const meta: Meta<InputWrapperComponent> = {
	title: 'Components/Input',
	component: InputWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		type: {
			control: 'select',
			options: Object.values(InputType),
			description: 'Тип поля ввода (text, number, date, time)',
			defaultValue: InputType.Text,
		},
		placeholder: {
			control: 'text',
			description: 'Текст подсказки в пустом поле',
			defaultValue: '',
		},
		readOnly: {
			control: 'boolean',
			description: 'Флаг запрета редактирования',
			defaultValue: false,
		},
		align: {
			control: 'select',
			options: Object.values(Align),
			description: 'Выравнивание текста в поле',
			defaultValue: Align.Start,
		},
		min: {
			control: 'text',
			description: 'Минимальное допустимое значение',
			defaultValue: undefined,
		},
		max: {
			control: 'text',
			description: 'Максимальное допустимое значение',
			defaultValue: undefined,
		},
	},
};

export default meta;

type Story = StoryObj<InputWrapperComponent>;

/**
 * Базовый пример использования компонента.
 */
export const Default: Story = {
	args: {
		type: InputType.Text,
		placeholder: '',
		readOnly: false,
		align: Align.Start,
		min: undefined,
		max: undefined,
	},
};

/**
 * Пример поля с подсказкой.
 */
export const WithPlaceholder: Story = {
	args: {
		type: InputType.Text,
		placeholder: 'Введите текст',
		readOnly: false,
		align: Align.Start,
		min: undefined,
		max: undefined,
	},
};

/**
 * Пример поля только для чтения.
 */
export const ReadOnly: Story = {
	args: {
		type: InputType.Text,
		placeholder: 'Только для чтения',
		readOnly: true,
		align: Align.Start,
		min: undefined,
		max: undefined,
	},
};

/**
 * Пример числового поля с ограничениями.
 */
export const NumberInput: Story = {
	args: {
		type: InputType.Number,
		placeholder: 'Введите число',
		readOnly: false,
		align: Align.End,
		min: 0,
		max: 100,
	},
};

/**
 * Пример поля для ввода даты.
 */
export const DateInput: Story = {
	args: {
		type: InputType.Date,
		placeholder: 'Введите дату',
		readOnly: false,
		align: Align.Start,
		min: new Date(2024, 0, 1),
		max: new Date(2024, 11, 31),
	},
};

/**
 * Пример поля для ввода времени.
 */
export const TimeInput: Story = {
	args: {
		type: InputType.Time,
		placeholder: 'Введите время',
		readOnly: false,
		align: Align.Start,
		min: undefined,
		max: undefined,
	},
};
