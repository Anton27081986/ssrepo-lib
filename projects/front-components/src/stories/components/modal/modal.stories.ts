import type { Meta, StoryObj } from '@storybook/angular';
import { ModalWrapperComponent } from './modal-wrapper.component';
import { IconType, Shape, Status, ExtraSize } from '../../../lib/shared/models';

/**
 * Метаданные для компонента Modal.
 *
 * @description
 * Определяет конфигурацию и документацию
 * для компонента в Storybook.
 */
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

/**
 * Базовый пример использования компонента.
 */
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

/**
 * Пример модального окна с ошибкой.
 */
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
