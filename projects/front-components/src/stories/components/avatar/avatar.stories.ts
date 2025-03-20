import type { Meta, StoryObj } from '@storybook/angular';
import { AvatarWrapperComponent } from './avatar-wrapper.component';

const meta: Meta<AvatarWrapperComponent> = {
	title: 'Components/Avatar',
	component: AvatarWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		src: {
			control: 'text',
			description: 'Путь к фото',
		},
		username: {
			control: 'text',
			description: 'Имя пользователя',
		},
	},
};

export default meta;

type Story = StoryObj<AvatarWrapperComponent>;

export const Default: Story = {
	args: {
		src: '',
		username: '',
	},
};

export const WithImage: Story = {
	args: {
		src: 'https://picsum.photos/200',
		username: 'Иван Иванов',
	},
};

export const WithUsername: Story = {
	args: {
		src: '',
		username: 'Иван Иванов',
	},
};

export const LongUsername: Story = {
	args: {
		src: '',
		username: 'Иван Иванович Иванов',
	},
};
