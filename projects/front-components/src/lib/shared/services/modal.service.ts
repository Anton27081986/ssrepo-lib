import {
	ConnectedPosition,
	Overlay,
	OverlayConfig,
} from '@angular/cdk/overlay';
import { Injectable, Injector } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import {
	PopoverComponent,
	PopoverAnimationEnum,
} from '../../components/popover/popover.component';
import { PopupParams } from '../models/types/pop-up';
import { ModalRef } from '../models';
import { PopupTypeEnum } from '../models/enums/popup-type-enum';
import { optionalDefined, unwrapExpect } from './popup.utils';

@Injectable({ providedIn: 'root' })
export class ModalService {
	constructor(
		private readonly overlay: Overlay,
		private readonly injector: Injector,
	) {}

	public open<T>(params: PopupParams<T>): ModalRef<T> {
		const overlayRef = this.overlay.create(this._getOverlayConfig(params));

		const popoverRef = new ModalRef<T>(
			overlayRef,
			params.content,
			params.data,
			params.type,
		);

		const injector = this._createInjector(popoverRef, this.injector);

		const parentElem = overlayRef.overlayElement.parentElement;

		if (parentElem && params.type === PopupTypeEnum.Modal) {
			parentElem.className += 'ss-lib-popover-global-scrolled';
		}

		if (params.type === PopupTypeEnum.Panel) {
			popoverRef.setAnimateState(PopoverAnimationEnum.panel);
		}

		overlayRef.attach(
			new ComponentPortal(PopoverComponent, null, injector),
		);

		return popoverRef;
	}

	private _createInjector(
		popoverRef: ModalRef,
		injector: Injector,
	): Injector {
		return Injector.create({
			parent: injector,
			providers: [{ provide: ModalRef, useValue: popoverRef }],
		});
	}

	private _getOverlayConfig<T>(params: PopupParams<T>): OverlayConfig {
		const backdropClass: string[] = ['ss-lib-popover-overlay-backdrop'];

		let position: ConnectedPosition[];

		if (params.isDarkOverlay) {
			backdropClass.push('ss-lib-popover-overlay-backdrop--dark');
		}

		const originOption = optionalDefined(
			document.getElementById('app-root'),
		);

		const panelClass: string[] = ['ss-lib-popover-root'];
		let positionStrategy;

		if (params.type === PopupTypeEnum.Modal) {
			positionStrategy = this.overlay
				.position()
				.global()
				.centerHorizontally()
				.centerVertically();
		}

		if (params.type === PopupTypeEnum.Panel) {
			params.height = '100%';
			params.width = params.width ? params.width : '100%';

			position = [
				{
					originX: 'end',
					originY: 'top',
					overlayX: 'end',
					overlayY: 'top',
				},
			];

			positionStrategy = this.overlay
				.position()
				.flexibleConnectedTo(
					unwrapExpect(originOption, 'Not found app-root'),
				)
				.withPositions(position)
				.withFlexibleDimensions(false)
				.withPush(false);
		}

		return new OverlayConfig({
			hasBackdrop: !params.hasBackdrop,
			width: params.width,
			minWidth: params.minWidth,
			maxWidth: params.maxWidth,
			maxHeight: params.maxHeight,
			height: params.height,
			backdropClass,
			panelClass,
			positionStrategy,
		});
	}
}
