import type { Meta, StoryObj } from '@storybook/angular';
import { SelectWrapperComponent } from './select-wrapper.component';

const meta: Meta<SelectWrapperComponent> = {
	title: 'Components/Select',
	component: SelectWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		placeholder: {
			control: 'text',
			description: 'Placeholder для селекта',
			defaultValue: 'Выберите из списка',
		},
	},
};

export default meta;

type Story = StoryObj<SelectWrapperComponent>;

export const Default: Story = {
	args: {
		placeholder: 'Выберите из списка',
	},
};

export const CustomPlaceholder: Story = {
	args: {
		placeholder: 'Выберите значение',
	},
};
