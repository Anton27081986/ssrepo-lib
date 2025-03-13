import { ToastTypeEnum } from '../enums';

export class Toast {
	public type: ToastTypeEnum = ToastTypeEnum.Default;
	public text = '';
	public mainButton?: ButtonToast;
	public secondaryButton?: ButtonToast;
}

export interface ButtonToast {
	text: string;
	click: (event: MouseEvent) => void;
}
