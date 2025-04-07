import type { Meta, StoryObj } from '@storybook/angular';
import { ConfirmModalWrapperComponent } from './confirm-modal-wrapper.component';
import { ExtraSize, Shape, Status, IconType } from '../../../lib/shared/models';

const meta: Meta<ConfirmModalWrapperComponent> = {
	title: 'Components/ConfirmModal',
	component: ConfirmModalWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		data: {
			control: 'object',
			description: 'Данные модального окна',
			defaultValue: {
				title: 'Подтверждение действия',
				description: 'Вы уверены, что хотите выполнить это действие?',
				badgeProps: {
					icon: IconType.CheckCircle,
					size: ExtraSize.lg,
					shape: Shape.Square,
					status: Status.Default,
				},
				apply: {
					text: 'Подтвердить',
				},
				cancelText: 'Отмена',
			},
		},
	},
};

export default meta;

type Story = StoryObj<ConfirmModalWrapperComponent>;

export const Default: Story = {
	args: {
		data: {
			title: 'Подтверждение действия',
			description: 'Вы уверены, что хотите выполнить это действие?',
			badgeProps: {
				icon: IconType.CheckCircle,
				size: ExtraSize.lg,
				shape: Shape.Square,
				status: Status.Default,
			},
			apply: {
				text: 'Подтвердить',
			},
			cancelText: 'Отмена',
		},
	},
};

export const Error: Story = {
	args: {
		data: {
			title: 'Удаление',
			description: 'Вы уверены, что хотите удалить этот элемент?',
			badgeProps: {
				icon: IconType.Alert,
				size: ExtraSize.lg,
				shape: Shape.Square,
				status: Status.Error,
			},
			apply: {
				text: 'Удалить',
			},
			cancelText: 'Отмена',
		},
	},
};

export const WithoutCancel: Story = {
	args: {
		data: {
			title: 'Информация',
			description: 'Это информационное сообщение',
			badgeProps: {
				icon: IconType.Help,
				size: ExtraSize.lg,
				shape: Shape.Square,
				status: Status.Default,
			},
			apply: {
				text: 'Понятно',
			},
		},
	},
};
