import type { Meta, StoryObj } from '@storybook/angular';
import { TooltipWrapperComponent } from './tooltip-wrapper.component';
import { TooltipPosition } from '../../../lib/shared/models';

const meta: Meta<TooltipWrapperComponent> = {
	title: 'Components/Tooltip',
	component: TooltipWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		text: {
			control: 'text',
			description: 'Текст подсказки',
		},
		position: {
			control: 'select',
			options: Object.values(TooltipPosition),
			description: 'Позиция подсказки',
		},
	},
};

export default meta;

type Story = StoryObj<TooltipWrapperComponent>;

export const Default: Story = {
	args: {
		text: 'Это подсказка',
		position: TooltipPosition.Bottom,
	},
};

export const TopPosition: Story = {
	args: {
		text: 'Подсказка сверху',
		position: TooltipPosition.Top,
	},
};

export const LeftPosition: Story = {
	args: {
		text: 'Подсказка слева',
		position: TooltipPosition.Left,
	},
};

export const RightPosition: Story = {
	args: {
		text: 'Подсказка справа',
		position: TooltipPosition.Right,
	},
};

export const LongText: Story = {
	args: {
		text: 'Это очень длинная подсказка, которая может занимать несколько строк и содержать много текста',
		position: TooltipPosition.Bottom,
	},
};
