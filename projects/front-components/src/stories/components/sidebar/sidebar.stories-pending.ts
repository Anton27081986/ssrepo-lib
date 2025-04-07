import type { Meta, StoryObj } from '@storybook/angular';
import { SidebarWrapperComponent } from './sidebar-wrapper.component';
import { IconType } from '../../../lib/shared/models';

const meta: Meta<SidebarWrapperComponent> = {
	title: 'Components/Sidebar',
	component: SidebarWrapperComponent,
	tags: ['autodocs'],
	argTypes: {
		menu: {
			control: 'object',
			description: 'Меню сайдбара',
			defaultValue: [
				{
					title: 'Главная',
					toolTip: null,
					link: '/home',
					pressed: true,
					icon: IconType.HamburgerMenu,
					subMenu: [],
				},
				{
					title: 'Настройки',
					toolTip: null,
					link: '/settings',
					pressed: false,
					icon: IconType.Settings01,
					subMenu: [
						{
							title: 'Профиль',
							toolTip: null,
							link: '/settings/profile',
							pressed: false,
							icon: IconType.User01,
							subMenu: [],
						},
						{
							title: 'Безопасность',
							toolTip: null,
							link: '/settings/security',
							pressed: false,
							icon: IconType.Eye,
							subMenu: [],
						},
					],
				},
			],
		},
	},
};

export default meta;

type Story = StoryObj<SidebarWrapperComponent>;

export const Default: Story = {
	args: {
		menu: [
			{
				title: 'Главная',
				toolTip: null,
				link: '/home',
				pressed: true,
				icon: IconType.HamburgerMenu,
				subMenu: [],
			},
			{
				title: 'Настройки',
				toolTip: null,
				link: '/settings',
				pressed: false,
				icon: IconType.Settings01,
				subMenu: [
					{
						title: 'Профиль',
						toolTip: null,
						link: '/settings/profile',
						pressed: false,
						icon: IconType.User01,
						subMenu: [],
					},
					{
						title: 'Безопасность',
						toolTip: null,
						link: '/settings/security',
						pressed: false,
						icon: IconType.Eye,
						subMenu: [],
					},
				],
			},
		],
	},
};

export const WithManyItems: Story = {
	args: {
		menu: [
			{
				title: 'Главная',
				toolTip: null,
				link: '/home',
				pressed: true,
				icon: IconType.HamburgerMenu,
				subMenu: [],
			},
			{
				title: 'Проекты',
				toolTip: null,
				link: '/projects',
				pressed: false,
				icon: IconType.CheckCircle,
				subMenu: [],
			},
			{
				title: 'Задачи',
				toolTip: null,
				link: '/tasks',
				pressed: false,
				icon: IconType.Eye,
				subMenu: [],
			},
			{
				title: 'Календарь',
				toolTip: null,
				link: '/calendar',
				pressed: false,
				icon: IconType.Bell,
				subMenu: [],
			},
			{
				title: 'Настройки',
				toolTip: null,
				link: '/settings',
				pressed: false,
				icon: IconType.HamburgerMenu,
				subMenu: [
					{
						title: 'Профиль',
						toolTip: null,
						link: '/settings/profile',
						pressed: false,
						icon: IconType.User01,
						subMenu: [],
					},
					{
						title: 'Безопасность',
						toolTip: null,
						link: '/settings/security',
						pressed: false,
						icon: IconType.Eye,
						subMenu: [],
					},
				],
			},
		],
	},
};
