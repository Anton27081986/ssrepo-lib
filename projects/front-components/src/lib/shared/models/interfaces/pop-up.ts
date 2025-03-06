import {PopoverAnimationEnum} from '../../../components/generic-popup/generic-popup.component';
import {ConnectionPositionPair} from '@angular/cdk/overlay';
import {PopupContent, TypePopup} from '../types/pop-up';
import {Observable} from 'rxjs';
import {PopupTypeEnum} from '../enums/popup-type-enum';

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
  withoutBackdrop?: true | undefined;
  withoutBackground?: true | undefined;
  withoutAnimation?: true | undefined;
  animate?: PopoverAnimationEnum | undefined;
  isDarkOverlay: boolean;
}

export interface IPopoverConfig {
  positionPopover: ConnectionPositionPair[];
}

export interface PopupParamsPopover<T> extends PopupParamsBase<T> {
  type: PopupTypeEnum.Popover;
  popoverCfg: IPopoverConfig;
}

export interface PopupParamsModal<T> extends PopupParamsBase<T> {
  type: PopupTypeEnum.Modal;
}

export interface IPopoverRef<TIn = any> {
  readonly afterSubmit$: Observable<any>;
  readonly afterClosed$: Observable<any>;
  readonly afterDelete$: Observable<any>;

  close(): void;
}
