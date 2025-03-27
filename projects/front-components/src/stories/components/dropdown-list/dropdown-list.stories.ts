import type { Meta, StoryObj } from '@storybook/angular';
import { DropdownListWrapperComponent } from './dropdown-list-wrapper.component';

const meta: Meta<DropdownListWrapperComponent> = {
	title: 'Components/DropdownList',
	component: DropdownListWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		width: {
			control: 'text',
			description: 'Ширина выпадающего списка',
			defaultValue: 'max-content',
		},
		height: {
			control: 'text',
			description: 'Высота выпадающего списка',
			defaultValue: 'auto',
		},
	},
};

export default meta;

type Story = StoryObj<DropdownListWrapperComponent>;

export const Default: Story = {
	args: {
		width: 'max-content',
		height: 'auto',
	},
};

export const FixedWidth: Story = {
	args: {
		width: '200px',
		height: 'auto',
	},
};

export const FixedHeight: Story = {
	args: {
		width: 'max-content',
		height: '300px',
	},
};
