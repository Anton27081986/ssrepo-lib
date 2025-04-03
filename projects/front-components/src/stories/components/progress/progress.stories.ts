import type { Meta, StoryObj } from '@storybook/angular';
import { ProgressWrapperComponent } from './progress-wrapper.component';

const meta: Meta<ProgressWrapperComponent> = {
	title: 'Components/Progress',
	component: ProgressWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		state: {
			control: 'select',
			options: ['default', 'average', 'max'],
			description: 'Состояние прогресса',
			defaultValue: 'default',
		},
	},
};

export default meta;

type Story = StoryObj<ProgressWrapperComponent>;

export const Default: Story = {
	args: {
		state: 'default',
	},
};

export const Average: Story = {
	args: {
		state: 'average',
	},
};

export const Max: Story = {
	args: {
		state: 'max',
	},
};
