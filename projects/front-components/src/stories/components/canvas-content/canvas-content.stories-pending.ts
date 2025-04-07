import type { Meta, StoryObj } from '@storybook/angular';
import { CanvasContentWrapperComponent } from './canvas-content-wrapper.component';

const meta: Meta<CanvasContentWrapperComponent> = {
	title: 'Components/CanvasContent',
	component: CanvasContentWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		viewHeader: {
			control: 'boolean',
			description: 'Отображать заголовок',
			defaultValue: true,
		},
	},
};

export default meta;

type Story = StoryObj<CanvasContentWrapperComponent>;

export const Default: Story = {
	args: {
		viewHeader: true,
	},
};

export const WithoutHeader: Story = {
	args: {
		viewHeader: false,
	},
};
