import type { Meta, StoryObj } from '@storybook/angular';
import { ToastWrapperComponent } from './toast-wrapper.component';
import { ToastTypeEnum } from '../../../lib/shared/models';

const meta: Meta<ToastWrapperComponent> = {
	title: 'Components/Toast',
	component: ToastWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		toast: {
			control: 'object',
			description: 'Данные тоста',
			defaultValue: {
				type: ToastTypeEnum.Default,
				text: 'Это информационное сообщение',
			},
		},
	},
};

export default meta;

type Story = StoryObj<ToastWrapperComponent>;

export const Default: Story = {
	args: {
		toast: {
			type: ToastTypeEnum.Default,
			text: 'Это информационное сообщение',
		},
	},
};

export const Success: Story = {
	args: {
		toast: {
			type: ToastTypeEnum.Success,
			text: 'Операция успешно выполнена',
			mainButton: {
				text: 'Подтвердить',
				click: () => console.log('Подтверждено'),
			},
		},
	},
};

export const Error: Story = {
	args: {
		toast: {
			type: ToastTypeEnum.Error,
			text: 'Произошла ошибка',
			mainButton: {
				text: 'Повторить',
				click: () => console.log('Повторить'),
			},
			secondaryButton: {
				text: 'Отмена',
				click: () => console.log('Отменено'),
			},
		},
	},
};
