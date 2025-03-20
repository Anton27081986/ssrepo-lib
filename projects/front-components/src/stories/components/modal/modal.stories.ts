import type { Meta, StoryObj } from '@storybook/angular';
import { ModalWrapperComponent } from './modal-wrapper.component';
import { IconType, Shape, Status, ExtraSize } from '../../../lib/shared/models';

const meta: Meta<ModalWrapperComponent> = {
	title: 'Components/Modal',
	component: ModalWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		titleHeader: {
			control: 'text',
			description: 'Заголовок модального окна',
			defaultValue: 'Заголовок',
		},
		descriptionHeader: {
			control: 'text',
			description: 'Описание модального окна',
			defaultValue: 'Описание',
		},
		badgeProps: {
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

type Story = StoryObj<ModalWrapperComponent>;

export const Default: Story = {
	args: {
		titleHeader: 'Заголовок',
		descriptionHeader: 'Описание',
		actionsRef: null,
		contentRef: null,
		badgeProps: {
			icon: IconType.CheckCircle,
			size: ExtraSize.lg,
			shape: Shape.Square,
			status: Status.Default,
		},
	},
};

export const Error: Story = {
	args: {
		titleHeader: 'Ошибка',
		descriptionHeader: 'Произошла ошибка при выполнении операции',
		actionsRef: null,
		contentRef: null,
		badgeProps: {
			icon: IconType.Alert,
			size: ExtraSize.lg,
			shape: Shape.Square,
			status: Status.Error,
		},
	},
};
