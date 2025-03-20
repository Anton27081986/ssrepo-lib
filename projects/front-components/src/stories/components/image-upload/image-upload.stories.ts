import type { Meta, StoryObj } from '@storybook/angular';
import { ImageUploadWrapperComponent } from './image-upload-wrapper.component';

const meta: Meta<ImageUploadWrapperComponent> = {
	title: 'Components/ImageUpload',
	component: ImageUploadWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		disabled: {
			control: 'boolean',
			description: 'Отключенное состояние',
			defaultValue: false,
		},
		maxSize: {
			control: 'number',
			description: 'Максимальный размер файла в МБ',
			defaultValue: 0,
		},
		maxHeight: {
			control: 'number',
			description: 'Максимальная высота изображения в пикселях',
			defaultValue: 0,
		},
		maxWidth: {
			control: 'number',
			description: 'Максимальная ширина изображения в пикселях',
			defaultValue: 0,
		},
		src: {
			control: 'text',
			description: 'URL изображения',
			defaultValue: null,
		},
	},
};

export default meta;

type Story = StoryObj<ImageUploadWrapperComponent>;

export const Default: Story = {
	args: {
		disabled: false,
		maxSize: 0,
		maxHeight: 0,
		maxWidth: 0,
		src: null,
	},
};

export const WithMaxSize: Story = {
	args: {
		disabled: false,
		maxSize: 5,
		maxHeight: 0,
		maxWidth: 0,
		src: null,
	},
};

export const WithMaxDimensions: Story = {
	args: {
		disabled: false,
		maxSize: 0,
		maxHeight: 800,
		maxWidth: 1200,
		src: null,
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		maxSize: 0,
		maxHeight: 0,
		maxWidth: 0,
		src: null,
	},
};

export const WithPreview: Story = {
	args: {
		disabled: false,
		maxSize: 0,
		maxHeight: 0,
		maxWidth: 0,
		src: 'https://picsum.photos/200/300',
	},
};
