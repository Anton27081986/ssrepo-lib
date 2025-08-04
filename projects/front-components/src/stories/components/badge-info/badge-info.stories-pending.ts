import type { Meta, StoryObj } from '@storybook/angular';
import { DialogHeaderComponent } from '../../../lib/components/dialog-header/dialog-header.component';
import { ExtraSize, Shape, Status, IconType } from '../../../lib/shared/models';

const meta: Meta<DialogHeaderComponent> = {
	title: 'Components/BadgeInfo',
	component: DialogHeaderComponent,
	tags: ['autodocs'],
	argTypes: {
		title: {
			control: 'text',
			description: 'Заголовок бейджа',
		},
		description: {
			control: 'text',
			description: 'Описание бейджа',
		},
		viewClose: {
			control: 'boolean',
			description: 'Отображать кнопку закрытия',
		},
		badge: {
			control: 'object',
			description: 'Параметры бейджа',
			defaultValue: {
				icon: IconType.CheckCircle,
				size: ExtraSize.lg,
				shape: Shape.Square,
				status: Status.Default,
			},
		},
	},
};

export default meta;

type Story = StoryObj<DialogHeaderComponent>;

export const Default: Story = {
	args: {
		title: 'Успешно',
		description: 'Операция выполнена успешно',
		viewClose: true,
		badge: {
			icon: IconType.CheckCircle,
			size: ExtraSize.lg,
			shape: Shape.Square,
			status: Status.Default,
		},
	},
};

export const Error: Story = {
	args: {
		title: 'Ошибка',
		description: 'Произошла ошибка при выполнении операции',
		viewClose: true,
		badge: {
			icon: IconType.Alert,
			size: ExtraSize.lg,
			shape: Shape.Square,
			status: Status.Error,
		},
	},
};

export const WithoutClose: Story = {
	args: {
		title: 'Информация',
		description: 'Это информационное сообщение',
		viewClose: false,
		badge: {
			icon: IconType.Help,
			size: ExtraSize.lg,
			shape: Shape.Square,
			status: Status.Default,
		},
	},
};
