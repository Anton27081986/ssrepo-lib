import type { Meta, StoryObj } from '@storybook/angular';
import { TableWrapperComponent } from './table-wrapper.component';

/**
 * Метаданные для компонента Table
 * Предоставляет конфигурацию для Storybook и документацию компонента
 */
const meta: Meta<TableWrapperComponent> = {
	title: 'Components/Table',
	component: TableWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		isSkeleton: {
			control: 'boolean',
			description:
				'Флаг, определяющий, отображать ли таблицу в состоянии загрузки (скелетон)',
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
					'Компонент Table предоставляет функциональную таблицу с поддержкой настраиваемых колонок, состоянием загрузки и скелетоном. Таблица может быть использована для отображения структурированных данных с возможностью настройки внешнего вида и поведения.',
			},
		},
	},
};

export default meta;

type Story = StoryObj<TableWrapperComponent>;

/**
 * Базовый пример таблицы
 */
export const Default: Story = {
	args: {
		isSkeleton: false,
	},
	parameters: {
		docs: {
			description: {
				story: 'Демонстрирует таблицу в обычном состоянии с отображением данных.',
			},
		},
	},
};

/**
 * Пример таблицы в состоянии загрузки
 */
export const Loading: Story = {
	args: {
		isSkeleton: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Показывает таблицу в состоянии загрузки, где данные заменены скелетоном для улучшения пользовательского опыта во время загрузки данных.',
			},
		},
	},
};
