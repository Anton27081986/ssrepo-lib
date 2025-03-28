import type { Meta, StoryObj } from '@storybook/angular';
import { SpinnerWrapperComponent } from './spinner-wrapper.component';

/**
 * Метаданные для компонента Spinner.
 * Предоставляет конфигурацию для Storybook и документацию компонента.
 */
const meta: Meta<SpinnerWrapperComponent> = {
	title: 'Components/Spinner',
	component: SpinnerWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		displaySpinnerText: {
			control: 'boolean',
			description: 'Показать надпись "Загрузка..."',
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
					'Компонент Spinner предоставляет анимированный индикатор загрузки. ' +
					'Может использоваться для отображения состояния загрузки в различных ' +
					'частях приложения.',
			},
		},
	},
};

export default meta;

type Story = StoryObj<SpinnerWrapperComponent>;

/**
 * Базовый пример спиннера.
 * Демонстрирует спиннер без дополнительного текста.
 */
export const Default: Story = {
	args: {
		displaySpinnerText: false,
	},
	parameters: {
		docs: {
			description: {
				story:
					'Демонстрирует спиннер в его базовом виде, без дополнительного текста. ' +
					'Используется в случаях, когда контекст загрузки очевиден.',
			},
		},
	},
};

/**
 * Пример спиннера с текстом.
 * Показывает спиннер с дополнительным текстом загрузки.
 */
export const WithText: Story = {
	args: {
		displaySpinnerText: true,
	},
	parameters: {
		docs: {
			description: {
				story:
					'Показывает спиннер с текстом "Загрузка...". Используется, когда ' +
					'необходимо явно указать пользователю, что происходит процесс загрузки.',
			},
		},
	},
};
