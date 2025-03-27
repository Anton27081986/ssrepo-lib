import type { Meta, StoryObj } from '@storybook/angular';
import { ToggleWrapperComponent } from './toggle-wrapper.component';

const meta: Meta<ToggleWrapperComponent> = {
	title: 'Components/Toggle',
	component: ToggleWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		initialValue: {
			control: 'boolean',
			description: 'Начальное значение переключателя',
		},
		disabled: {
			control: 'boolean',
			description: 'Отключен ли переключатель',
		},
	},
};

export default meta;

type Story = StoryObj<ToggleWrapperComponent>;

export const Default: Story = {
	args: {
		initialValue: false,
		disabled: false,
	},
};

export const InitiallyChecked: Story = {
	args: {
		initialValue: true,
		disabled: false,
	},
};

export const Disabled: Story = {
	args: {
		initialValue: false,
		disabled: true,
	},
};

export const DisabledAndChecked: Story = {
	args: {
		initialValue: true,
		disabled: true,
	},
};
