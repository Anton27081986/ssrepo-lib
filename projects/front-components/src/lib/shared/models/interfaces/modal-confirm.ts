import type { IBadgeProps } from './badge-props';
import type { SubmitObservable } from '../types/submit-observable';

export interface IConfirmData {
	title: string;
	description: string;
	badgeProps: IBadgeProps;
	apply: IApply;
	cancelText: string | null;
}

export interface IApply {
	text: string;
	onSubmit?: SubmitObservable;
}
