import type { Meta, StoryObj } from '@storybook/angular';
import { TimepickerWrapperComponent } from './timepicker-wrapper.component';

const meta: Meta<TimepickerWrapperComponent> = {
	title: 'Components/Timepicker',
	component: TimepickerWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		disabled: {
			control: 'boolean',
			description: 'Отключен ли компонент',
			defaultValue: false,
		},
	},
};

export default meta;

type Story = StoryObj<TimepickerWrapperComponent>;

export const Default: Story = {
	args: {
		disabled: false,
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};
