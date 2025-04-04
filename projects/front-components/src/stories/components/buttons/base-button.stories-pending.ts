import type { Meta, StoryObj } from '@storybook/angular';
import { BaseButtonComponent } from '../../../lib/components';
import {
	ButtonType,
	ExtraSize,
	IconPosition,
	IconType,
} from '../../../lib/shared/models';

const meta: Meta<BaseButtonComponent<ButtonType>> = {
	title: 'Components/Buttons/BaseButton',
	component: BaseButtonComponent,
	tags: ['autodocs'],
	argTypes: {
		type: {
			control: 'select',
			options: Object.values(ButtonType),
			description: 'Тип кнопки',
		},
		size: {
			control: 'select',
			options: Object.values(ExtraSize),
			description: 'Размер кнопки',
		},
		disabled: {
			control: 'boolean',
			description: 'Состояние отключения',
		},
		text: {
			control: 'text',
			description: 'Текст кнопки',
		},
		icon: {
			control: 'select',
			options: Object.values(IconType),
			description: 'Иконка кнопки',
		},
		iconPosition: {
			control: 'select',
			options: Object.values(IconPosition),
			description: 'Позиция иконки',
		},
	},
};

export default meta;

type Story = StoryObj<BaseButtonComponent<ButtonType>>;

export const Primary: Story = {
	args: {
		type: ButtonType.Primary,
		size: ExtraSize.md,
		disabled: false,
		text: 'Primary Button',
	},
};

export const Secondary: Story = {
	args: {
		type: ButtonType.Secondary,
		size: ExtraSize.md,
		disabled: false,
		text: 'Secondary Button',
	},
};

export const Ghost: Story = {
	args: {
		type: ButtonType.Ghost,
		size: ExtraSize.md,
		disabled: false,
		text: 'Ghost Button',
	},
};

export const WithIcon: Story = {
	args: {
		type: ButtonType.Primary,
		size: ExtraSize.md,
		disabled: false,
		text: 'Button with Icon',
		icon: IconType.Eye,
		iconPosition: IconPosition.Start,
	},
};

export const Disabled: Story = {
	args: {
		type: ButtonType.Primary,
		size: ExtraSize.md,
		disabled: true,
		text: 'Disabled Button',
	},
};
