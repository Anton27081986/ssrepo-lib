import type { Meta, StoryObj } from '@storybook/angular';
import { LightBoxWrapperComponent } from './light-box-wrapper.component';

/**
 * Метаданные для компонента LightBox.
 *
 * @description
 * Определяет конфигурацию и документацию
 * для компонента в Storybook.
 */
const meta: Meta<LightBoxWrapperComponent> = {
	title: 'Components/LightBox',
	component: LightBoxWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		src: {
			control: 'text',
			description: 'URL изображения',
			defaultValue: 'https://picsum.photos/800/600',
		},
		width: {
			control: 'number',
			description: 'Ширина изображения',
			defaultValue: 800,
		},
		height: {
			control: 'number',
			description: 'Высота изображения',
			defaultValue: 600,
		},
	},
};

export default meta;

type Story = StoryObj<LightBoxWrapperComponent>;

/**
 * Базовый пример использования компонента.
 */
export const Default: Story = {
	args: {
		src: 'https://picsum.photos/800/600',
		width: 800,
		height: 600,
	},
};

/**
 * Пример с большим изображением.
 */
export const LargeImage: Story = {
	args: {
		src: 'https://picsum.photos/1200/900',
		width: 1200,
		height: 900,
	},
};

/**
 * Пример с маленьким изображением.
 */
export const SmallImage: Story = {
	args: {
		src: 'https://picsum.photos/400/300',
		width: 400,
		height: 300,
	},
};
