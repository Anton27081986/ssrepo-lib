import type { Meta, StoryObj } from '@storybook/angular';
import { ModalActionApplyWrapperComponent } from './modal-action-apply-wrapper.component';

/**
 * Метаданные для компонента ModalActionApply.
 *
 * @description
 * Определяет конфигурацию и документацию
 * для компонента в Storybook.
 */
const meta: Meta<ModalActionApplyWrapperComponent> = {
	title: 'Components/ModalActionApply',
	component: ModalActionApplyWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		applyText: {
			control: 'text',
			description: 'Текст кнопки подтверждения действия',
			defaultValue: 'Применить',
		},
		applyDisabled: {
			control: 'boolean',
			description: 'Флаг блокировки кнопки подтверждения',
			defaultValue: false,
		},
		cancelText: {
			control: 'text',
			description: 'Текст кнопки отмены действия',
			defaultValue: 'Отмена',
		},
	},
};

export default meta;

type Story = StoryObj<ModalActionApplyWrapperComponent>;

/**
 * Базовый пример использования компонента.
 */
export const Default: Story = {
	args: {
		applyText: 'Применить',
		applyDisabled: false,
		cancelText: 'Отмена',
	},
};

/**
 * Пример с отключенной кнопкой подтверждения.
 */
export const DisabledApply: Story = {
	args: {
		applyText: 'Применить',
		applyDisabled: true,
		cancelText: 'Отмена',
	},
};

/**
 * Пример с пользовательскими текстами кнопок.
 */
export const CustomTexts: Story = {
	args: {
		applyText: 'Сохранить',
		applyDisabled: false,
		cancelText: 'Закрыть',
	},
};
