import type { Meta, StoryObj } from '@storybook/angular';
import { TimepickerWrapperComponent } from './timepicker-wrapper.component';

/**
 * Метаданные для компонента Timepicker.
 * Предоставляет конфигурацию для Storybook и документацию компонента.
 */
const meta: Meta<TimepickerWrapperComponent> = {
	title: 'Components/Timepicker',
	component: TimepickerWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		disabled: {
			control: 'boolean',
			description:
				'Флаг, определяющий, отключен ли компонент выбора времени (недоступен для взаимодействия)',
			table: {
				defaultValue: { summary: 'false' },
				type: { summary: 'boolean' },
			},
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					'Компонент Timepicker предоставляет удобный интерфейс для выбора времени. ' +
					'Поддерживает ввод времени как с клавиатуры, так и через специальный интерфейс выбора. ' +
					'Компонент может быть отключен для предотвращения изменений.',
			},
		},
	},
};

export default meta;

type Story = StoryObj<TimepickerWrapperComponent>;

/**
 * Базовый пример с настройками по умолчанию.
 * Демонстрирует компонент выбора времени в его базовом состоянии.
 */
export const Default: Story = {
	args: {
		disabled: false,
	},
	parameters: {
		docs: {
			description: {
				story:
					'Демонстрирует компонент выбора времени в его базовом состоянии, ' +
					'доступном для взаимодействия.',
			},
		},
	},
};

/**
 * Пример с отключенным состоянием.
 * Показывает, как компонент выглядит и ведет себя в недоступном состоянии.
 */
export const Disabled: Story = {
	args: {
		disabled: true,
	},
	parameters: {
		docs: {
			description: {
				story:
					'Показывает компонент выбора времени в отключенном состоянии, ' +
					'когда пользователь не может изменить значение.',
			},
		},
	},
};
