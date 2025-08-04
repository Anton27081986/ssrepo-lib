import { IconType } from '../enums';

export interface Tab {
	text: string;
	icon?: IconType;
	tag?: string;
	isVisible: boolean;
	isDisabled: boolean;
}
