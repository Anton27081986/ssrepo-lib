import { Injectable } from '@angular/core';
import type { ModalRef } from '../models/utils/modal.ref';
import type { PopupContent } from '../models/types/pop-up';
import type { ModalService } from './modal.service';
import { PopupTypeEnum } from '../models/enums/popup-type-enum';
import { ConfirmModalComponent, LightBoxComponent } from '../../components';
import type { IConfirmData, ILightBoxData } from '../models';

@Injectable({ providedIn: 'root' })
export class SharedPopupService {
	constructor(private readonly _popup: ModalService) {}

	/**
	 * func open modal window
	 * @param content - content config
	 * @param data - data for modal window
	 * @param isDarkOverlay - background dark
	 * @param size - size modal window
	 * @param isBackDropClick - func close backdrop click
	 */
	public openModal<T>(
		content: PopupContent,
		data: T,
		isDarkOverlay: boolean = true,
		size: string,
		isBackDropClick: boolean = true,
	): ModalRef<T> {
		const popover = this._popup.open<T>({
			content,
			data,
			origin: null,
			type: PopupTypeEnum.Modal,
			isDarkOverlay,
			width: size,
		});

		if (isBackDropClick) {
			// на случай если появится необходимость закрытия по клику
			this._addBackdropCatch(popover);
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
		content: PopupContent = ConfirmModalComponent,
		isDarkOverlay: boolean = true,
		isBackDropClick: boolean = false,
	): ModalRef<IConfirmData> {
		const popover = this._popup.open<IConfirmData>({
			content,
			data,
			origin: null,
			type: PopupTypeEnum.Modal,
			width: '400px',
			isDarkOverlay,
		});

		if (isBackDropClick) {
			// на случай если появится необходимость закрытия по клику
			this._addBackdropCatch(popover);
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
		content: PopupContent = LightBoxComponent,
		isDarkOverlay: boolean = true,
		isBackDropClick: boolean = false,
	): ModalRef<ILightBoxData> {
		const popover = this._popup.open<ILightBoxData>({
			content,
			data,
			origin: null,
			type: PopupTypeEnum.Modal,
			isDarkOverlay,
		});

		if (isBackDropClick) {
			// на случай если появится необходимость закрытия по клику
			this._addBackdropCatch(popover);
		}

		return popover;
	}

	private _addBackdropCatch(popover: ModalRef) {
		popover.overlayRef.backdropClick().subscribe((e) => {
			popover.close();
		});
	}
}
