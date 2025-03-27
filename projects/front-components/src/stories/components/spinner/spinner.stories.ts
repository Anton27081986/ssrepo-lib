import type { Meta, StoryObj } from '@storybook/angular';
import { SpinnerWrapperComponent } from './spinner-wrapper.component';

const meta: Meta<SpinnerWrapperComponent> = {
	title: 'Components/Spinner',
	component: SpinnerWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		displaySpinnerText: {
			control: 'boolean',
			description: 'Показать надпись "Загрузка..."',
		},
	},
};

export default meta;

type Story = StoryObj<SpinnerWrapperComponent>;

export const Default: Story = {
	args: {
		displaySpinnerText: false,
	},
};

export const WithText: Story = {
	args: {
		displaySpinnerText: true,
	},
};
