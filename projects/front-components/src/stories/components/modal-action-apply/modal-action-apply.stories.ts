import type { Meta, StoryObj } from '@storybook/angular';
import { ModalActionApplyWrapperComponent } from './modal-action-apply-wrapper.component';

const meta: Meta<ModalActionApplyWrapperComponent> = {
	title: 'Components/ModalActionApply',
	component: ModalActionApplyWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		applyText: {
			control: 'text',
			description: 'Текст кнопки "Применить"',
		},
		applyDisabled: {
			control: 'boolean',
			description: 'Отключена ли кнопка "Применить"',
		},
		cancelText: {
			control: 'text',
			description: 'Текст кнопки "Отмена"',
		},
	},
};

export default meta;

type Story = StoryObj<ModalActionApplyWrapperComponent>;

export const Default: Story = {
	args: {
		applyText: 'Применить',
		applyDisabled: false,
		cancelText: 'Отмена',
	},
};

export const DisabledApply: Story = {
	args: {
		applyText: 'Применить',
		applyDisabled: true,
		cancelText: 'Отмена',
	},
};

export const CustomTexts: Story = {
	args: {
		applyText: 'Сохранить',
		applyDisabled: false,
		cancelText: 'Закрыть',
	},
};
