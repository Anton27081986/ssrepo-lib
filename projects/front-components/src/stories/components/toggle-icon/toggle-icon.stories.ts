import type { Meta, StoryObj } from '@storybook/angular';
import { ToggleIconWrapperComponent } from './toggle-icon-wrapper.component';
import { IconType } from '../../../lib/shared/models';

const meta: Meta<ToggleIconWrapperComponent> = {
	title: 'Components/ToggleIcon',
	component: ToggleIconWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		iconTrue: {
			control: 'select',
			options: Object.values(IconType),
			description: 'Иконка для состояния "включено"',
		},
		iconFalse: {
			control: 'select',
			options: Object.values(IconType),
			description: 'Иконка для состояния "выключено"',
		},
		initialValue: {
			control: 'boolean',
			description: 'Начальное состояние переключателя',
		},
	},
};

export default meta;

type Story = StoryObj<ToggleIconWrapperComponent>;

export const Default: Story = {
	args: {
		iconTrue: IconType.Sun,
		iconFalse: IconType.Moon,
		initialValue: false,
	},
};

export const CustomIcons: Story = {
	args: {
		iconTrue: IconType.Eye,
		iconFalse: IconType.EyeOff,
		initialValue: false,
	},
};

export const InitiallyOn: Story = {
	args: {
		iconTrue: IconType.Sun,
		iconFalse: IconType.Moon,
		initialValue: true,
	},
};

export const NotificationToggle: Story = {
	args: {
		iconTrue: IconType.Bell,
		iconFalse: IconType.Bell,
		initialValue: false,
	},
};
