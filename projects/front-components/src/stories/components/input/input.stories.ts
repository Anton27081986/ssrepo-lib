import type { Meta, StoryObj } from '@storybook/angular';
import { InputWrapperComponent } from './input-wrapper.component';
import { InputType, Align } from '../../../lib/shared/models';

const meta: Meta<InputWrapperComponent> = {
	title: 'Components/Input',
	component: InputWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		type: {
			control: 'select',
			options: Object.values(InputType),
			description: 'Тип поля ввода',
			defaultValue: InputType.Text,
		},
		placeholder: {
			control: 'text',
			description: 'Placeholder',
			defaultValue: '',
		},
		readOnly: {
			control: 'boolean',
			description: 'Только для чтения',
			defaultValue: false,
		},
		align: {
			control: 'select',
			options: Object.values(Align),
			description: 'Выравнивание',
			defaultValue: Align.Start,
		},
		min: {
			control: 'text',
			description: 'Минимальное значение',
			defaultValue: undefined,
		},
		max: {
			control: 'text',
			description: 'Максимальное значение',
			defaultValue: undefined,
		},
	},
};

export default meta;

type Story = StoryObj<InputWrapperComponent>;

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
