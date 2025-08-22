import type { IconType } from '../enums';

export interface IMenu {
	title: string;
	active: boolean;
	icon: IconType;
	subMenu: IMenu[];
	toolTip?: string;
	link?: string;
}
