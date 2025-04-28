import type { TemplateRef, Type } from '@angular/core';
import type {
	PopupParamsModal,
	PopupParamsPanel,
	PopupParamsPopover,
} from '../interfaces/pop-up';
import type { PopupTypeEnum } from '../enums/popup-type-enum';

export type PopupContent = TemplateRef<{}> | Type<{}>;

export type PopupParams<T> =
	| PopupParamsPopover<T>
	| PopupParamsModal<T>
	| PopupParamsPanel<T>;

export type TypePopup =
	| PopupTypeEnum.Modal
	| PopupTypeEnum.Popover
	| PopupTypeEnum.Panel;
