import type { Meta, StoryObj } from '@storybook/angular';
import { SkeletonBlockWrapperComponent } from './skeleton-block-wrapper.component';
import { Shape } from '../../../lib/shared/models';

const meta: Meta<SkeletonBlockWrapperComponent> = {
	title: 'Components/SkeletonBlock',
	component: SkeletonBlockWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		config: {
			control: 'object',
			description: 'Конфигурация скелетона',
		},
	},
};

export default meta;

type Story = StoryObj<SkeletonBlockWrapperComponent>;

export const Default: Story = {
	args: {
		config: {
			width: '200px',
			height: '20px',
			type: Shape.Square,
		},
	},
};

export const Round: Story = {
	args: {
		config: {
			width: '100px',
			height: '100px',
			type: Shape.Round,
		},
	},
};

export const Large: Story = {
	args: {
		config: {
			width: '300px',
			height: '40px',
			type: Shape.Square,
		},
	},
};
