import type { Meta, StoryObj } from '@storybook/angular';
import { NavButtonWrapperComponent } from './nav-button-wrapper.component';
import { NavButton, IconType } from '../../../lib/shared/models';

const meta: Meta<NavButtonWrapperComponent> = {
	title: 'Components/NavButton',
	component: NavButtonWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		type: {
			control: 'select',
			options: [NavButton.NavBase, NavButton.NavIcon],
			description: 'Тип кнопки навигации',
			defaultValue: NavButton.NavBase,
		},
		menu: {
			control: 'object',
			description: 'Меню кнопки',
			defaultValue: {
				title: 'Главная',
				toolTip: 'Перейти на главную страницу',
				link: '/',
				pressed: false,
				icon: IconType.HamburgerMenu,
				subMenu: [],
			},
		},
	},
};

export default meta;

type Story = StoryObj<NavButtonWrapperComponent>;

export const Default: Story = {
	args: {
		type: NavButton.NavBase,
		menu: {
			title: 'Главная',
			toolTip: 'Перейти на главную страницу',
			link: '/',
			pressed: false,
			icon: IconType.HamburgerMenu,
			subMenu: [],
		},
	},
};

export const WithSubMenu: Story = {
	args: {
		type: NavButton.NavBase,
		menu: {
			title: 'Настройки',
			toolTip: 'Настройки приложения',
			link: '/settings',
			pressed: false,
			icon: IconType.Settings01,
			subMenu: [
				{
					title: 'Профиль',
					toolTip: 'Настройки профиля',
					link: '/settings/profile',
					pressed: false,
					icon: IconType.User01,
					subMenu: [],
				},
				{
					title: 'Безопасность',
					toolTip: 'Настройки безопасности',
					link: '/settings/security',
					pressed: false,
					icon: IconType.Eye,
					subMenu: [],
				},
			],
		},
	},
};

export const IconOnly: Story = {
	args: {
		type: NavButton.NavIcon,
		menu: {
			title: 'Уведомления',
			toolTip: 'Показать уведомления',
			link: '/notifications',
			pressed: false,
			icon: IconType.Bell,
			subMenu: [],
		},
	},
};
