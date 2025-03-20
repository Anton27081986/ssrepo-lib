import type { Meta, StoryObj } from '@storybook/angular';
import { LightBoxWrapperComponent } from './light-box-wrapper.component';

const meta: Meta<LightBoxWrapperComponent> = {
	title: 'Components/LightBox',
	component: LightBoxWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		src: {
			control: 'text',
			description: 'URL изображения',
		},
		width: {
			control: 'number',
			description: 'Ширина изображения',
		},
		height: {
			control: 'number',
			description: 'Высота изображения',
		},
	},
};

export default meta;

type Story = StoryObj<LightBoxWrapperComponent>;

export const Default: Story = {
	args: {
		src: 'https://picsum.photos/800/600',
		width: 800,
		height: 600,
	},
};

export const LargeImage: Story = {
	args: {
		src: 'https://picsum.photos/1200/900',
		width: 1200,
		height: 900,
	},
};

export const SmallImage: Story = {
	args: {
		src: 'https://picsum.photos/400/300',
		width: 400,
		height: 300,
	},
};
