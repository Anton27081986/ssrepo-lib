import {
	IconType,
	IMenu,
} from '../../../../../front-components/src/lib/shared/models';

export const MENU_LIST: IMenu[] = [
	{
		title: 'Главная',
		icon: IconType.Logo,
		active: true,
		subMenu: [],
	},
	{
		title: 'Категории',
		icon: IconType.Columns,
		active: false,
		subMenu: [
			{
				title: 'Фото',
				icon: IconType.ImagePlus,
				active: false,
				subMenu: [],
			},
			{
				title: 'Документы',
				icon: IconType.FileSearch02,
				active: false,
				subMenu: [],
			},
		],
	},
	{
		title: 'Уведомления',
		icon: IconType.Bell,
		active: false,
		subMenu: [],
	},
	{
		title: 'Настройки',
		icon: IconType.Settings01,
		active: false,
		subMenu: [],
	},
	{
		title: 'Пользователи',
		icon: IconType.Users,
		active: false,
		subMenu: [],
	},
];
