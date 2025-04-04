import type { Meta, StoryObj } from '@storybook/angular';
import { DropdownListWrapperComponent } from './dropdown-list-wrapper.component';

/**
 * Метаданные для компонента DropdownList.
 *
 * @description
 * Определяет конфигурацию и документацию
 * для компонента в Storybook.
 */
const meta: Meta<DropdownListWrapperComponent> = {
	title: 'Components/DropdownList',
	component: DropdownListWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		width: {
			control: 'text',
			description: 'Ширина выпадающего списка в пикселях или процентах',
			defaultValue: 'max-content',
		},
		height: {
			control: 'text',
			description: 'Высота выпадающего списка в пикселях или процентах',
			defaultValue: 'auto',
		},
	},
};

export default meta;

type Story = StoryObj<DropdownListWrapperComponent>;

/**
 * Базовый пример использования компонента.
 */
export const Default: Story = {
	args: {
		width: 'max-content',
		height: 'auto',
	},
};

/**
 * Пример с фиксированной шириной.
 */
export const FixedWidth: Story = {
	args: {
		width: '200px',
		height: 'auto',
	},
};

/**
 * Пример с фиксированной высотой.
 */
export const FixedHeight: Story = {
	args: {
		width: 'max-content',
		height: '300px',
	},
};
