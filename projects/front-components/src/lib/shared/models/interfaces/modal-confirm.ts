import type { IBadgeProps } from './badge-props';
import type { PopoverConfirmationSubmit } from '../types/confirm-modal';

export interface IConfirmData {
	title: string;
	description: string;
	badgeProps: IBadgeProps;
	apply: IApply;
	cancelText?: string;
}

export interface IApply {
	text: string;
	onSubmit?: PopoverConfirmationSubmit;
}
