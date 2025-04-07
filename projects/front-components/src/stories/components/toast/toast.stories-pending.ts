import type { Meta, StoryObj } from '@storybook/angular';
import { ToastWrapperComponent } from './toast-wrapper.component';
import { ToastTypeEnum } from '../../../lib/shared/models';

/**
 * Метаданные для компонента Toast.
 * Предоставляет конфигурацию для Storybook и документацию компонента.
 */
const meta: Meta<ToastWrapperComponent> = {
	title: 'Components/Toast',
	component: ToastWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		toast: {
			control: 'object',
			description:
				'Объект с данными для отображения тоста, включающий тип, текст и кнопки',
			table: {
				defaultValue: {
					summary: `{
						type: ToastTypeEnum.Default,
						text: 'Это информационное сообщение'
					}`,
				},
				type: { summary: 'Toast' },
			},
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					'Компонент Toast предоставляет систему уведомлений с различными типами ' +
					'сообщений (информация, успех, ошибка). Поддерживает настраиваемые кнопки ' +
					'действий и может быть использован для отображения важных сообщений пользователю.',
			},
		},
	},
};

export default meta;

type Story = StoryObj<ToastWrapperComponent>;

/**
 * Базовый пример информационного тоста.
 * Демонстрирует простой вариант использования без дополнительных действий.
 */
export const Default: Story = {
	args: {
		toast: {
			type: ToastTypeEnum.Default,
			text: 'Это информационное сообщение',
		},
	},
	parameters: {
		docs: {
			description: {
				story:
					'Демонстрирует простой информационный тост без кнопок действий, ' +
					'используемый для отображения обычных уведомлений.',
			},
		},
	},
};

/**
 * Пример тоста успешного выполнения операции.
 * Показывает уведомление об успехе с возможностью подтверждения.
 */
export const Success: Story = {
	args: {
		toast: {
			type: ToastTypeEnum.Success,
			text: 'Операция успешно выполнена',
			mainButton: {
				text: 'Подтвердить',
				click: () => {
					// Обработка подтверждения
				},
			},
		},
	},
	parameters: {
		docs: {
			description: {
				story:
					'Показывает тост успешного выполнения операции с кнопкой подтверждения, ' +
					'используемый для подтверждения успешных действий пользователя.',
			},
		},
	},
};

/**
 * Пример тоста с ошибкой.
 * Демонстрирует уведомление об ошибке с возможностью повторного выполнения.
 */
export const Error: Story = {
	args: {
		toast: {
			type: ToastTypeEnum.Error,
			text: 'Произошла ошибка',
			mainButton: {
				text: 'Повторить',
				click: () => {
					// Обработка повторного выполнения
				},
			},
			secondaryButton: {
				text: 'Отмена',
				click: () => {
					// Обработка отмены
				},
			},
		},
	},
	parameters: {
		docs: {
			description: {
				story:
					'Демонстрирует тост с ошибкой, содержащий две кнопки: для повторного ' +
					'выполнения операции и отмены. Используется для обработки ошибок с ' +
					'возможностью восстановления.',
			},
		},
	},
};
