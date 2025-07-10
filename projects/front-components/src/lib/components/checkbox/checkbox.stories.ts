import type { Meta, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';

const meta: Meta<CheckboxComponent> = {
	title: 'Components/Checkbox',
	component: CheckboxComponent,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		label: {
			control: 'text',
			description: 'Основная подпись чекбокса',
		},
		description: {
			control: 'text',
			description: 'Второстепенный текст описания',
		},
		indeterminate: {
			control: 'boolean',
			description: 'Третье состояние чекбокса',
		},
	},
	args: {
		label: '',
		description: '',
		indeterminate: false,
	},
};

export default meta;

type Story = StoryObj<CheckboxComponent>;

export const Default: Story = {
	args: {},
};

export const WithLabel: Story = {
	args: {
		label: 'Согласен с условиями',
	},
};

export const WithLabelAndDescription: Story = {
	args: {
		label: 'Согласен с условиями',
		description: 'Подробнее в пользовательском соглашении',
	},
};

export const Indeterminate: Story = {
	args: {
		label: 'Выбрать все',
		description: 'Частично выбраны элементы',
		indeterminate: true,
	},
};

export const LongText: Story = {
	args: {
		label: 'Я согласен с условиями пользовательского соглашения и политикой конфиденциальности',
		description:
			'Данное соглашение включает в себя обработку персональных данных, использование cookies и другие условия использования сервиса',
	},
};
