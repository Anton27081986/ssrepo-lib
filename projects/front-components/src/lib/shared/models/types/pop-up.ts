import type { TemplateRef, Type } from "@angular/core";
import type {
	PopupParamsModal,
	PopupParamsPopover,
} from "../interfaces/pop-up";
import type { PopupTypeEnum } from "../enums/popup-type-enum";

export type PopupContent = TemplateRef<any> | Type<any>;

export type PopupParams<T> = PopupParamsPopover<T> | PopupParamsModal<T>;

export type TypePopup = PopupTypeEnum.Modal | PopupTypeEnum.Popover;
