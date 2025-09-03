import type { ConnectionPositionPair } from '@angular/cdk/overlay';
import type { Observable } from 'rxjs';
import type { PopoverAnimationEnum } from '../../../components/popover/popover.component';
import type { PopupContent, TypePopup } from '../types/pop-up';
import type { PopupTypeEnum } from '../enums/popup-type-enum';

interface PopupParamsBase<T> {
	width?: string | number;
	minWidth?: string | number;
	maxWidth?: string | number;
	maxHeight?: string | number;
	height?: string | number;
	origin: HTMLElement | null;
	content: PopupContent;
	data: T;
	type: TypePopup;
	withoutBackground?: true | undefined;
	withoutAnimation?: true | undefined;
	animate?: PopoverAnimationEnum | undefined;
	isDarkOverlay: boolean;
	hasBackdrop?: boolean;
}

export interface IPopoverConfig {
	positionPopover: ConnectionPositionPair[];
}

export interface PopupParamsPopover<T> extends PopupParamsBase<T> {
	type: PopupTypeEnum.Popover;
}

export interface PopupParamsModal<T> extends PopupParamsBase<T> {
	type: PopupTypeEnum.Modal;
}

export interface PopupParamsPanel<T> extends PopupParamsBase<T> {
	type: PopupTypeEnum.Panel;
}

export interface IPopoverRef<T = unknown> {
	readonly afterSubmit$: Observable<T>;
	readonly afterClosed$: Observable<T>;
	readonly afterDelete$: Observable<T>;

	close(): void;
}
