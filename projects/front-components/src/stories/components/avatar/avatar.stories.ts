import type { Meta, StoryObj } from '@storybook/angular';
import { AvatarWrapperComponent } from './avatar-wrapper.component';

/**
 * Метаданные для компонента Avatar.
 * Предоставляет конфигурацию для Storybook и документацию компонента.
 */
const meta: Meta<AvatarWrapperComponent> = {
	title: 'Components/Avatar',
	component: AvatarWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		src: {
			control: 'text',
			description:
				'URL изображения аватара. Если не указан, будут отображаться инициалы из username',
			table: {
				defaultValue: { summary: '""' },
				type: { summary: 'string' },
			},
		},
		username: {
			control: 'text',
			description:
				'Имя пользователя. Используется для отображения инициалов, если src не указан',
			table: {
				defaultValue: { summary: '""' },
				type: { summary: 'string' },
			},
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					'Компонент Avatar используется для отображения изображения профиля пользователя ' +
					'или его инициалов. Поддерживает как загрузку изображения, так и автоматическое ' +
					'формирование инициалов из имени пользователя.',
			},
		},
	},
};

export default meta;

type Story = StoryObj<AvatarWrapperComponent>;

/**
 * Базовый пример с пустыми значениями.
 * Демонстрирует аватар в исходном состоянии.
 */
export const Default: Story = {
	args: {
		src: '',
		username: '',
	},
	parameters: {
		docs: {
			description: {
				story: 'Показывает аватар в исходном состоянии без изображения и имени пользователя.',
			},
		},
	},
};

/**
 * Пример с изображением аватара.
 * Демонстрирует аватар с загруженным изображением.
 */
export const WithImage: Story = {
	args: {
		src: 'https://picsum.photos/200',
		username: 'Иван Иванов',
	},
	parameters: {
		docs: {
			description: {
				story:
					'Демонстрирует аватар с загруженным изображением профиля. ' +
					'Имя пользователя используется как запасной вариант.',
			},
		},
	},
};

/**
 * Пример с инициалами.
 * Показывает аватар с отображением инициалов из имени пользователя.
 */
export const WithUsername: Story = {
	args: {
		src: '',
		username: 'Иван Иванов',
	},
	parameters: {
		docs: {
			description: {
				story:
					'Показывает аватар с отображением инициалов из имени пользователя, ' +
					'когда изображение не загружено.',
			},
		},
	},
};

/**
 * Пример с длинным именем пользователя.
 * Демонстрирует аватар с длинным именем пользователя.
 */
export const LongUsername: Story = {
	args: {
		src: '',
		username: 'Иван Иванович Иванов',
	},
	parameters: {
		docs: {
			description: {
				story:
					'Демонстрирует аватар с длинным именем пользователя, ' +
					'показывая, как компонент обрабатывает длинные имена.',
			},
		},
	},
};
