import type { Meta, StoryObj } from '@storybook/angular';
import { SkeletonTableWrapperComponent } from './skeleton-table-wrapper.component';

const meta: Meta<SkeletonTableWrapperComponent> = {
	title: 'Components/SkeletonTable',
	component: SkeletonTableWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		countItems: {
			control: 'number',
			description: 'Количество строк в таблице',
		},
	},
};

export default meta;

type Story = StoryObj<SkeletonTableWrapperComponent>;

export const Default: Story = {
	args: {
		countItems: 7,
	},
};

export const FewRows: Story = {
	args: {
		countItems: 3,
	},
};

export const ManyRows: Story = {
	args: {
		countItems: 10,
	},
};
