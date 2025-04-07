import type { Meta, StoryObj } from '@storybook/angular';
import { NumberPickerWrapperComponent } from './number-picker-wrapper.component';

const meta: Meta<NumberPickerWrapperComponent> = {
	title: 'Components/NumberPicker',
	component: NumberPickerWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		min: {
			control: 'number',
			description: 'Минимальное значение',
			defaultValue: undefined,
		},
		max: {
			control: 'number',
			description: 'Максимальное значение',
			defaultValue: undefined,
		},
		step: {
			control: 'number',
			description: 'Шаг изменения значения',
			defaultValue: 1,
		},
	},
};

export default meta;

type Story = StoryObj<NumberPickerWrapperComponent>;

export const Default: Story = {
	args: {
		min: undefined,
		max: undefined,
		step: 1,
	},
};

export const WithLimits: Story = {
	args: {
		min: 0,
		max: 100,
		step: 1,
	},
};

export const WithDecimalStep: Story = {
	args: {
		min: 0,
		max: 10,
		step: 0.1,
	},
};
