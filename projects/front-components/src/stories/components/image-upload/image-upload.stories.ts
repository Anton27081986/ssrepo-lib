import type { Meta, StoryObj } from '@storybook/angular';
import { ImageUploadWrapperComponent } from './image-upload-wrapper.component';

/**
 * Метаданные для компонента ImageUpload.
 *
 * @description
 * Определяет конфигурацию и документацию
 * для компонента в Storybook.
 */
const meta: Meta<ImageUploadWrapperComponent> = {
	title: 'Components/ImageUpload',
	component: ImageUploadWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		disabled: {
			control: 'boolean',
			description: 'Флаг блокировки компонента',
			defaultValue: false,
		},
		maxSize: {
			control: 'number',
			description: 'Максимальный размер загружаемого файла в мегабайтах',
			defaultValue: 0,
		},
		maxHeight: {
			control: 'number',
			description:
				'Максимальная высота загружаемого изображения в пикселях',
			defaultValue: 0,
		},
		maxWidth: {
			control: 'number',
			description:
				'Максимальная ширина загружаемого изображения в пикселях',
			defaultValue: 0,
		},
		src: {
			control: 'text',
			description: 'URL изображения для предпросмотра',
			defaultValue: null,
		},
	},
};

export default meta;

type Story = StoryObj<ImageUploadWrapperComponent>;

/**
 * Базовый пример использования компонента.
 */
export const Default: Story = {
	args: {
		disabled: false,
		maxSize: 0,
		maxHeight: 0,
		maxWidth: 0,
		src: null,
	},
};

/**
 * Пример с ограничением размера файла.
 */
export const WithMaxSize: Story = {
	args: {
		disabled: false,
		maxSize: 5,
		maxHeight: 0,
		maxWidth: 0,
		src: null,
	},
};

/**
 * Пример с ограничением размеров изображения.
 */
export const WithMaxDimensions: Story = {
	args: {
		disabled: false,
		maxSize: 0,
		maxHeight: 800,
		maxWidth: 1200,
		src: null,
	},
};

/**
 * Пример отключенного состояния.
 */
export const Disabled: Story = {
	args: {
		disabled: true,
		maxSize: 0,
		maxHeight: 0,
		maxWidth: 0,
		src: null,
	},
};

/**
 * Пример с предпросмотром изображения.
 */
export const WithPreview: Story = {
	args: {
		disabled: false,
		maxSize: 0,
		maxHeight: 0,
		maxWidth: 0,
		src: 'https://picsum.photos/200/300',
	},
};
