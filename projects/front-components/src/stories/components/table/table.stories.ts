import type { Meta, StoryObj } from '@storybook/angular';
import { TableWrapperComponent } from './table-wrapper.component';

const meta: Meta<TableWrapperComponent> = {
	title: 'Components/Table',
	component: TableWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		isSkeleton: {
			control: 'boolean',
			description: 'Отображать ли таблицу в состоянии загрузки',
			defaultValue: false,
		},
	},
};

export default meta;

type Story = StoryObj<TableWrapperComponent>;

export const Default: Story = {
	args: {
		isSkeleton: false,
	},
};

export const Loading: Story = {
	args: {
		isSkeleton: true,
	},
};
