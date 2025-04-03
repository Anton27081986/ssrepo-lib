import type { Meta, StoryObj } from '@storybook/angular';
import { DropdownItemWrapperComponent } from './dropdown-item-wrapper.component';
import { IconType } from '../../../lib/shared/models';

/**
 * Метаданные для компонента DropdownItem.
 *
 * @description
 * Определяет конфигурацию и документацию
 * для компонента в Storybook.
 */
const meta: Meta<DropdownItemWrapperComponent> = {
	title: 'Components/DropdownItem',
	component: DropdownItemWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		label: {
			control: 'text',
			description: 'Текст, отображаемый в элементе списка',
			defaultValue: 'Элемент списка',
		},
		value: {
			control: 'text',
			description: 'Данные элемента списка',
			defaultValue: null,
		},
		icon: {
			control: 'select',
			options: Object.values(IconType),
			description: 'Тип иконки, отображаемой в элементе',
			defaultValue: null,
		},
		isDestructive: {
			control: 'boolean',
			description: 'Флаг деструктивного действия',
			defaultValue: false,
		},
		isDisabled: {
			control: 'boolean',
			description: 'Флаг блокировки элемента',
			defaultValue: false,
		},
	},
};

export default meta;

type Story = StoryObj<DropdownItemWrapperComponent>;

/**
 * Базовый пример использования компонента.
 */
export const Default: Story = {
	args: {
		label: 'Элемент списка',
		value: null,
		icon: null,
		isDestructive: false,
		isDisabled: false,
	},
};

/**
 * Пример элемента с иконкой.
 */
export const WithIcon: Story = {
	args: {
		label: 'Элемент с иконкой',
		value: null,
		icon: IconType.Settings01,
		isDestructive: false,
		isDisabled: false,
	},
};

/**
 * Пример деструктивного элемента.
 */
export const Destructive: Story = {
	args: {
		label: 'Удалить',
		value: null,
		icon: IconType.Trash,
		isDestructive: true,
		isDisabled: false,
	},
};

/**
 * Пример отключенного элемента.
 */
export const Disabled: Story = {
	args: {
		label: 'Отключенный элемент',
		value: null,
		icon: null,
		isDestructive: false,
		isDisabled: true,
	},
};
