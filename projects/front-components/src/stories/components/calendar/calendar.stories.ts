import type { Meta, StoryObj } from '@storybook/angular';
import { CalendarComponent } from '../../../lib/components/calendar/calendar.component';
import { CalendarDay } from '../../../lib/components/calendar/models';

const meta: Meta<CalendarComponent> = {
	title: 'Components/Calendar',
	component: CalendarComponent,
	tags: ['autodocs'],
	argTypes: {
		value: {
			control: 'object',
			description: 'Выбранная дата',
		},
		min: {
			control: 'object',
			description: 'Минимальная дата для выбора',
		},
		max: {
			control: 'object',
			description: 'Максимальная дата для выбора',
		},
	},
};

export default meta;

type Story = StoryObj<CalendarComponent>;

export const Default: Story = {
	args: {
		value: null,
		min: null,
		max: null,
	},
};

export const WithSelectedDate: Story = {
	args: {
		value: CalendarDay.currentLocal(),
		min: null,
		max: null,
	},
};

export const WithDateRange: Story = {
	args: {
		value: null,
		min: new CalendarDay(2024, 0, 1), // 1 января 2024
		max: new CalendarDay(2024, 11, 31), // 31 декабря 2024
	},
};
