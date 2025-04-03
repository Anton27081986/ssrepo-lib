// datepicker.component.stories.ts
import { Meta, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { moduleMetadata } from '@storybook/angular';
import { FormFieldComponent } from '../../../lib/components';
import { datepickerImports } from '../../../lib/components/datepicker/datepicker.imports';
import { DatepickerWrapperComponent } from './datepicker-wrapper.component';
import {
	FIRST_NATIVE_DAY,
	LAST_NATIVE_DAY,
} from '../../../lib/components/calendar/constans';

/**
 * Метаданные для компонента Datepicker.
 * Предоставляет конфигурацию для Storybook и документацию компонента.
 */
export default {
	title: 'Components/Datepicker',
	component: DatepickerWrapperComponent,
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [
				ReactiveFormsModule,
				FormFieldComponent,
				...datepickerImports,
			],
		}),
	],
	argTypes: {
		min: {
			control: 'date',
			description: 'Минимальная дата, доступная для выбора в календаре',
			table: {
				defaultValue: {
					summary: FIRST_NATIVE_DAY.toLocaleDateString('ru-RU', {
						day: '2-digit',
						month: '2-digit',
						year: 'numeric',
					})
						.split('.')
						.join('/'),
				},
				type: { summary: 'Date' },
			},
		},
		max: {
			control: 'date',
			description: 'Максимальная дата, доступная для выбора в календаре',
			table: {
				defaultValue: {
					summary: LAST_NATIVE_DAY.toLocaleDateString('ru-RU', {
						day: '2-digit',
						month: '2-digit',
						year: 'numeric',
					})
						.split('.')
						.join('/'),
				},
				type: { summary: 'Date' },
			},
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					'Компонент Datepicker предоставляет удобный и гибкий способ выбора дат ' +
					'в заданном диапазоне. Он поддерживает несколько вариантов взаимодействия: ' +
					'ручной ввод даты, выбор из интуитивно понятного календаря или быстрое ' +
					'переключение между годами и месяцами для точной настройки.',
			},
		},
	},
} as Meta<DatepickerWrapperComponent>;

type Story = StoryObj<DatepickerWrapperComponent>;

/**
 * Базовый пример с настройками по умолчанию.
 * Демонстрирует Datepicker с минимальными и максимальными значениями по умолчанию.
 */
export const Default: Story = {
	name: 'По умолчанию',
	args: {
		min: FIRST_NATIVE_DAY,
		max: LAST_NATIVE_DAY,
	},
	parameters: {
		docs: {
			description: {
				story:
					'Демонстрирует Datepicker с минимальными и максимальными значениями ' +
					'по умолчанию.',
			},
		},
	},
};

/**
 * Пример с заранее выбранной датой.
 * Показывает Datepicker с предустановленным значением и пользовательским диапазоном.
 */
export const WithSelectedDate: Story = {
	name: 'С выбранной датой',
	args: {
		min: new Date(2020, 0, 1), // 1 января 2020
		max: new Date(2025, 11, 31), // 31 декабря 2025
	},
	render: (args) => ({
		props: {
			...args,
			datepickerCtrl: new FormControl<Date | null>(new Date(2024, 5, 15)), // 15 июня 2024
		},
		template: `
			<ss-lib-datepicker-wrapper
				[min]="min"
				[max]="max"
			></ss-lib-datepicker-wrapper>
		`,
	}),
	parameters: {
		docs: {
			description: {
				story:
					'Показывает Datepicker с заранее установленной датой (15 июня 2024) ' +
					'и пользовательским диапазоном дат.',
			},
		},
	},
};

/**
 * Пример с узким диапазоном дат.
 * Демонстрирует Datepicker с ограниченным выбором дат.
 */
export const NarrowRange: Story = {
	name: 'Узкий диапазон',
	args: {
		min: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // Первый день текущего месяца
		max: new Date(), // Текущая дата
	},
	render: (args) => ({
		props: {
			...args,
			datepickerCtrl: new FormControl<Date | null>(null),
		},
		template: `
			<ss-lib-datepicker-wrapper
				[min]="min"
				[max]="max"
			></ss-lib-datepicker-wrapper>
		`,
	}),
	parameters: {
		docs: {
			description: {
				story:
					'Отображает Datepicker с ограниченным диапазоном от начала текущего месяца ' +
					'до сегодняшнего дня.',
			},
		},
	},
};

/**
 * Пример с отключенным состоянием.
 * Показывает Datepicker в недоступном для взаимодействия состоянии.
 */
export const Disabled: Story = {
	name: 'Отключенный',
	args: {
		min: new Date(2020, 0, 1), // 1 января 2020
		max: new Date(2025, 11, 31), // 31 декабря 2025
	},
	render: (args) => ({
		props: {
			...args,
			datepickerCtrl: new FormControl<Date | null>({
				value: new Date(2024, 5, 15), // 15 июня 2024
				disabled: true,
			}),
		},
		template: `
			<ss-lib-datepicker-wrapper
				[min]="min"
				[max]="max"
			></ss-lib-datepicker-wrapper>
		`,
	}),
	parameters: {
		docs: {
			description: {
				story:
					'Демонстрирует Datepicker в отключенном состоянии с выбранной датой ' +
					'(15 июня 2024).',
			},
		},
	},
};
