import type { Meta, StoryObj } from '@storybook/angular';
import { DropdownItemWrapperComponent } from './dropdown-item-wrapper.component';
import { IconType } from '../../../lib/shared/models';

const meta: Meta<DropdownItemWrapperComponent> = {
	title: 'Components/DropdownItem',
	component: DropdownItemWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		label: {
			control: 'text',
			description: 'Текст элемента',
			defaultValue: 'Элемент списка',
		},
		value: {
			control: 'text',
			description: 'Значение элемента',
			defaultValue: null,
		},
		icon: {
			control: 'select',
			options: Object.values(IconType),
			description: 'Иконка элемента',
			defaultValue: null,
		},
		isDestructive: {
			control: 'boolean',
			description: 'Деструктивное действие',
			defaultValue: false,
		},
		isDisabled: {
			control: 'boolean',
			description: 'Отключенное состояние',
			defaultValue: false,
		},
	},
};

export default meta;

type Story = StoryObj<DropdownItemWrapperComponent>;

export const Default: Story = {
	args: {
		label: 'Элемент списка',
		value: null,
		icon: null,
		isDestructive: false,
		isDisabled: false,
	},
};

export const WithIcon: Story = {
	args: {
		label: 'Элемент с иконкой',
		value: null,
		icon: IconType.Settings01,
		isDestructive: false,
		isDisabled: false,
	},
};

export const Destructive: Story = {
	args: {
		label: 'Удалить',
		value: null,
		icon: IconType.Trash,
		isDestructive: true,
		isDisabled: false,
	},
};

export const Disabled: Story = {
	args: {
		label: 'Отключенный элемент',
		value: null,
		icon: null,
		isDestructive: false,
		isDisabled: true,
	},
};
