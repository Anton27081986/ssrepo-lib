import type { Meta, StoryObj } from '@storybook/angular';
import { TooltipWrapperComponent } from './tooltip-wrapper.component';
import { TooltipPosition } from '../../../lib/shared/models';

/**
 * Метаданные для компонента Tooltip.
 * Предоставляет конфигурацию для Storybook и документацию компонента.
 */
const meta: Meta<TooltipWrapperComponent> = {
	title: 'Components/Tooltip',
	component: TooltipWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		text: {
			control: 'text',
			description: 'Текст, отображаемый в подсказке',
			table: {
				defaultValue: { summary: 'Это подсказка' },
				type: { summary: 'string' },
			},
		},
		position: {
			control: 'select',
			options: Object.values(TooltipPosition),
			description:
				'Позиция подсказки относительно элемента (сверху, снизу, слева, справа)',
			table: {
				defaultValue: { summary: TooltipPosition.Bottom },
				type: { summary: 'TooltipPosition' },
			},
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					'Компонент Tooltip предоставляет всплывающие подсказки, которые появляются ' +
					'при наведении на элемент. Поддерживает различные позиции отображения и ' +
					'настраиваемый текст.',
			},
		},
	},
};

export default meta;

type Story = StoryObj<TooltipWrapperComponent>;

/**
 * Базовый пример с настройками по умолчанию.
 * Демонстрирует тултип в стандартном положении.
 */
export const Default: Story = {
	args: {
		text: 'Это подсказка',
		position: TooltipPosition.Bottom,
	},
	parameters: {
		docs: {
			description: {
				story:
					'Демонстрирует тултип с базовыми настройками, ' +
					'отображаемый снизу элемента.',
			},
		},
	},
};

/**
 * Пример тултипа, отображаемого сверху.
 * Показывает подсказку над элементом.
 */
export const TopPosition: Story = {
	args: {
		text: 'Подсказка сверху',
		position: TooltipPosition.Top,
	},
	parameters: {
		docs: {
			description: {
				story: 'Показывает тултип, расположенный над элементом.',
			},
		},
	},
};

/**
 * Пример тултипа, отображаемого слева.
 * Демонстрирует подсказку слева от элемента.
 */
export const LeftPosition: Story = {
	args: {
		text: 'Подсказка слева',
		position: TooltipPosition.Left,
	},
	parameters: {
		docs: {
			description: {
				story: 'Демонстрирует тултип, расположенный слева от элемента.',
			},
		},
	},
};

/**
 * Пример тултипа, отображаемого справа.
 * Показывает подсказку справа от элемента.
 */
export const RightPosition: Story = {
	args: {
		text: 'Подсказка справа',
		position: TooltipPosition.Right,
	},
	parameters: {
		docs: {
			description: {
				story: 'Показывает тултип, расположенный справа от элемента.',
			},
		},
	},
};

/**
 * Пример тултипа с длинным текстом.
 * Демонстрирует поведение подсказки с большим объемом текста.
 */
export const LongText: Story = {
	args: {
		text:
			'Это очень длинная подсказка, которая может занимать несколько строк ' +
			'и содержать много текста',
		position: TooltipPosition.Bottom,
	},
	parameters: {
		docs: {
			description: {
				story:
					'Демонстрирует поведение тултипа при отображении длинного текста, ' +
					'показывая, как компонент адаптируется под размер контента.',
			},
		},
	},
};
