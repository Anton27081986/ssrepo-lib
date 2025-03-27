import type { Meta, StoryObj } from '@storybook/angular';
import { ScrollbarWrapperComponent } from './scrollbar-wrapper.component';

const meta: Meta<ScrollbarWrapperComponent> = {
	title: 'Components/Scrollbar',
	component: ScrollbarWrapperComponent,
	tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<ScrollbarWrapperComponent>;

export const Default: Story = {
	args: {},
};
