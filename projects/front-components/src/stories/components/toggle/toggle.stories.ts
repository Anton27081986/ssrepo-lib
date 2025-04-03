import type { Meta, StoryObj } from '@storybook/angular';
import { ToggleWrapperComponent } from './toggle-wrapper.component';

/**
 * Метаданные для компонента Toggle.
 * Предоставляет конфигурацию для Storybook и документацию компонента.
 */
const meta: Meta<ToggleWrapperComponent> = {
	title: 'Components/Toggle',
	component: ToggleWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		initialValue: {
			control: 'boolean',
			description: 'Начальное значение переключателя (включен/выключен)',
			table: {
				defaultValue: { summary: 'false' },
				type: { summary: 'boolean' },
			},
		},
		disabled: {
			control: 'boolean',
			description:
				'Флаг, определяющий, отключен ли переключатель (недоступен для взаимодействия)',
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
					'Компонент Toggle предоставляет интерактивный переключатель с двумя состояниями ' +
					'(включено/выключено). Поддерживает управление начальным состоянием и возможность ' +
					'отключения взаимодействия.',
			},
		},
	},
};

export default meta;

type Story = StoryObj<ToggleWrapperComponent>;

/**
 * Базовый пример с настройками по умолчанию.
 * Демонстрирует переключатель в исходном состоянии.
 */
export const Default: Story = {
	args: {
		initialValue: false,
		disabled: false,
	},
	parameters: {
		docs: {
			description: {
				story:
					'Демонстрирует переключатель в исходном состоянии ' +
					'(выключен и доступен для взаимодействия).',
			},
		},
	},
};

/**
 * Пример с изначально включенным состоянием.
 * Показывает переключатель, который начинается во включенном состоянии.
 */
export const InitiallyChecked: Story = {
	args: {
		initialValue: true,
		disabled: false,
	},
	parameters: {
		docs: {
			description: {
				story:
					'Показывает переключатель, который изначально находится ' +
					'во включенном состоянии.',
			},
		},
	},
};

/**
 * Пример с отключенным состоянием.
 * Демонстрирует переключатель, недоступный для взаимодействия.
 */
export const Disabled: Story = {
	args: {
		initialValue: false,
		disabled: true,
	},
	parameters: {
		docs: {
			description: {
				story:
					'Демонстрирует переключатель в отключенном состоянии, ' +
					'когда взаимодействие с ним недоступно.',
			},
		},
	},
};

/**
 * Пример с отключенным состоянием и включенным значением.
 * Показывает переключатель, который находится во включенном состоянии
 * и недоступен для взаимодействия.
 */
export const DisabledAndChecked: Story = {
	args: {
		initialValue: true,
		disabled: true,
	},
	parameters: {
		docs: {
			description: {
				story:
					'Показывает переключатель, который находится во включенном состоянии ' +
					'и при этом недоступен для взаимодействия.',
			},
		},
	},
};
