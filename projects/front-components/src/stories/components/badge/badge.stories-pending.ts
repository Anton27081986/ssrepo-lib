import type { Meta, StoryObj } from '@storybook/angular';
import { BadgeWrapperComponent } from './badge-wrapper.component';
import { IconType, Shape, Status } from '../../../lib/shared/models';

const meta: Meta<BadgeWrapperComponent> = {
	title: 'Components/Badge',
	component: BadgeWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		badgeProps: {
			control: 'object',
			description: 'Параметры бейджа',
		},
	},
};

export default meta;

type Story = StoryObj<BadgeWrapperComponent>;

export const Default: Story = {
	args: {
		badgeProps: {
			icon: IconType.Bell,
			size: 'lg',
			shape: Shape.Square,
			status: Status.Default,
		},
	},
};

export const Error: Story = {
	args: {
		badgeProps: {
			icon: IconType.Bell,
			size: 'lg',
			shape: Shape.Square,
			status: Status.Error,
		},
	},
};

export const Round: Story = {
	args: {
		badgeProps: {
			icon: IconType.Bell,
			size: 'lg',
			shape: Shape.Round,
			status: Status.Default,
		},
	},
};

export const Small: Story = {
	args: {
		badgeProps: {
			icon: IconType.Bell,
			size: 'sm',
			shape: Shape.Square,
			status: Status.Default,
		},
	},
};

export const Large: Story = {
	args: {
		badgeProps: {
			icon: IconType.Bell,
			size: 'xl',
			shape: Shape.Square,
			status: Status.Default,
		},
	},
};
