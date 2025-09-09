import { ElementRef, inject, Injectable } from '@angular/core';
import { PopupContent } from '../models/types/pop-up';
import { PopoverService } from './popover.service';
import { PopupTypeEnum } from '../models/enums/popup-type-enum';
import {
	ConfirmModalComponent,
	LightBoxComponent,
	ToastRef,
} from '../../components';
import { IConfirmData, ILightBoxData, ModalRef, Toast } from '../models';
import { ToastService } from './toast.service';

@Injectable({ providedIn: 'root' })
export class SharedPopupService {
	private readonly popup: PopoverService = inject(PopoverService);
	private readonly toastService: ToastService = inject(ToastService);

	/**
	 * func open modal window
	 * @param content - content config
	 * @param data - data for modal window
	 * @param isDarkOverlay - background dark
	 * @param width - size modal window
	 * @param isBackDropClick - func close backdrop click
	 */
	public openModal<T>(
		content: PopupContent,
		data: T,
		isDarkOverlay: boolean = true,
		width: string,
		isBackDropClick: boolean = false,
	): ModalRef<T> {
		const popover = this.popup.open<T>({
			content,
			data,
			origin: null,
			type: PopupTypeEnum.Modal,
			isDarkOverlay,
			width,
		});

		if (isBackDropClick) {
			// на случай если появится необходимость закрытия по клику
			this.addBackdropCatch(popover);
		}

		return popover;
	}

	/**
	 * func open confirm modal
	 * @param content - content config
	 * @param data - data for notice modal
	 * @param isDarkOverlay - background dark
	 * @param isBackDropClick - func close backdrop click
	 */
	public openConfirmModal(
		data: IConfirmData,
		isDarkOverlay: boolean = true,
		isBackDropClick: boolean = false,
		content: PopupContent = ConfirmModalComponent,
	): ModalRef<IConfirmData> {
		const popover = this.popup.open<IConfirmData>({
			content,
			data,
			origin: null,
			type: PopupTypeEnum.Modal,
			width: '400px',
			isDarkOverlay,
		});

		if (isBackDropClick) {
			// на случай если появится необходимость закрытия по клику
			this.addBackdropCatch(popover);
		}

		return popover;
	}

	/**
	 * func open confirm modal
	 * @param content - content config
	 * @param data - data for notice modal
	 * @param isDarkOverlay - background dark
	 * @param isBackDropClick - func close backdrop click
	 */
	public openLightBoxModal(
		data: ILightBoxData,
		isDarkOverlay: boolean = true,
		isBackDropClick: boolean = false,
		content: PopupContent = LightBoxComponent,
	): ModalRef<ILightBoxData> {
		const popover = this.popup.open<ILightBoxData>({
			content,
			data,
			origin: null,
			type: PopupTypeEnum.Modal,
			isDarkOverlay,
		});

		if (isBackDropClick) {
			// на случай если появится необходимость закрытия по клику
			this.addBackdropCatch(popover);
		}

		return popover;
	}

	public openToast(toast: Toast): ToastRef {
		return this.toastService.show(toast);
	}

	public openRightSidePage<T>(
		content: PopupContent,
		data: T,
		width: string,
		hasBackDrop: boolean = true,
		isDarkOverlay: boolean = true,
		isBackDropClick: boolean = false,
	): ModalRef<T> {
		const popover = this.popup.open<T>({
			content,
			data,
			origin: null,
			type: PopupTypeEnum.Panel,
			width,
			isDarkOverlay,
			hasBackdrop: hasBackDrop,
		});

		if (isBackDropClick) {
			this.addBackdropCatch(popover);
		}

		return popover;
	}

	public openPopover<T>(
		origin: HTMLElement | ElementRef | { elementRef: ElementRef },
		content: PopupContent,
		data: T,
		width: string = 'auto',
		hasBackDrop: boolean = true,
		isDarkOverlay: boolean = false,
		isBackDropClick: boolean = true,
	): ModalRef<T> {
		const nativeEl = this.unwrapOrigin(origin);

		const popover = this.popup.open<T>({
			content,
			data,
			origin: nativeEl,
			type: PopupTypeEnum.Popover,
			width,
			isDarkOverlay,
			hasBackdrop: hasBackDrop,
		});

		if (isBackDropClick) {
			this.addBackdropCatch(popover);
		}

		return popover;
	}

	private unwrapOrigin(
		origin: HTMLElement | ElementRef | { elementRef: ElementRef },
	): HTMLElement {
		if (origin instanceof ElementRef) {
			return origin.nativeElement;
		}

		if (origin instanceof HTMLElement) {
			return origin;
		}

		if ('elementRef' in origin && origin.elementRef instanceof ElementRef) {
			return origin.elementRef.nativeElement;
		}

		throw new Error('Unsupported origin type for popover');
	}

	private addBackdropCatch(popover: ModalRef): void {
		popover.overlayRef.backdropClick().subscribe(() => {
			popover.close();
		});
	}
}
