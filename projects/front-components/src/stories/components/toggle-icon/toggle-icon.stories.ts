import type { Meta, StoryObj } from '@storybook/angular';
import { ToggleIconWrapperComponent } from './toggle-icon-wrapper.component';
import { IconType } from '../../../lib/shared/models';

/**
 * Метаданные для компонента ToggleIcon.
 * Предоставляет конфигурацию для Storybook и документацию компонента.
 */
const meta: Meta<ToggleIconWrapperComponent> = {
	title: 'Components/ToggleIcon',
	component: ToggleIconWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		iconTrue: {
			control: 'select',
			options: Object.values(IconType),
			description:
				'Иконка, которая отображается, когда переключатель включен',
			table: {
				defaultValue: { summary: 'IconType.Sun' },
				type: { summary: 'IconType' },
			},
		},
		iconFalse: {
			control: 'select',
			options: Object.values(IconType),
			description:
				'Иконка, которая отображается, когда переключатель выключен',
			table: {
				defaultValue: { summary: 'IconType.Moon' },
				type: { summary: 'IconType' },
			},
		},
		initialValue: {
			control: 'boolean',
			description: 'Начальное состояние переключателя (включен/выключен)',
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
					'Компонент ToggleIcon предоставляет интерактивный переключатель с ' +
					'настраиваемыми иконками для разных состояний. Это позволяет создавать ' +
					'интуитивно понятные переключатели для различных сценариев использования, ' +
					'таких как переключение темы, видимости или уведомлений.',
			},
		},
	},
};

export default meta;

type Story = StoryObj<ToggleIconWrapperComponent>;

/**
 * Базовый пример с иконками солнца и луны.
 * Демонстрирует классический вариант использования для переключения темы.
 */
export const Default: Story = {
	args: {
		iconTrue: IconType.Sun,
		iconFalse: IconType.Moon,
		initialValue: false,
	},
	parameters: {
		docs: {
			description: {
				story:
					'Демонстрирует переключатель с классическими иконками солнца и луны, ' +
					'часто используемый для переключения темной/светлой темы.',
			},
		},
	},
};

/**
 * Пример с пользовательскими иконками.
 * Показывает использование других иконок для создания переключателя видимости.
 */
export const CustomIcons: Story = {
	args: {
		iconTrue: IconType.Eye,
		iconFalse: IconType.EyeOff,
		initialValue: false,
	},
	parameters: {
		docs: {
			description: {
				story:
					'Показывает использование других иконок (глаз) для создания ' +
					'переключателя видимости.',
			},
		},
	},
};

/**
 * Пример с изначально включенным состоянием.
 * Демонстрирует переключатель, начинающийся во включенном состоянии.
 */
export const InitiallyOn: Story = {
	args: {
		iconTrue: IconType.Sun,
		iconFalse: IconType.Moon,
		initialValue: true,
	},
	parameters: {
		docs: {
			description: {
				story:
					'Демонстрирует переключатель, который изначально находится ' +
					'во включенном состоянии.',
			},
		},
	},
};

/**
 * Пример с одинаковыми иконками.
 * Показывает использование одной и той же иконки для обоих состояний.
 */
export const NotificationToggle: Story = {
	args: {
		iconTrue: IconType.Bell,
		iconFalse: IconType.Bell,
		initialValue: false,
	},
	parameters: {
		docs: {
			description: {
				story:
					'Показывает использование одинаковых иконок для обоих состояний, ' +
					'что может быть полезно для простых переключателей, где состояние ' +
					'отображается только цветом.',
			},
		},
	},
};
