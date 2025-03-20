import type { Meta, StoryObj } from '@storybook/angular';
import { ScrollableBlockWrapperComponent } from './scrollable-block-wrapper.component';

const meta: Meta<ScrollableBlockWrapperComponent> = {
	title: 'Components/ScrollableBlock',
	component: ScrollableBlockWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		horizontalScroll: {
			control: 'boolean',
			description: 'Скрыть горизонтальную прокрутку',
			defaultValue: false,
		},
		verticalScroll: {
			control: 'boolean',
			description: 'Скрыть вертикальную прокрутку',
			defaultValue: true,
		},
		disableAutoSize: {
			control: 'boolean',
			description: 'Отключить автоматический размер',
			defaultValue: false,
		},
	},
};

export default meta;

type Story = StoryObj<ScrollableBlockWrapperComponent>;

export const Default: Story = {
	args: {
		horizontalScroll: false,
		verticalScroll: true,
		disableAutoSize: false,
	},
};

export const HorizontalScroll: Story = {
	args: {
		horizontalScroll: true,
		verticalScroll: true,
		disableAutoSize: false,
	},
};

export const NoVerticalScroll: Story = {
	args: {
		horizontalScroll: false,
		verticalScroll: false,
		disableAutoSize: false,
	},
};

export const DisabledAutoSize: Story = {
	args: {
		horizontalScroll: false,
		verticalScroll: true,
		disableAutoSize: true,
	},
};
