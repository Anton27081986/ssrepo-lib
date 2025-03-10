import { Overlay } from '@angular/cdk/overlay';
import { OverlayConfig } from '@angular/cdk/overlay';
import { Injectable, Injector } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { GenericPopupComponent } from '../../components/generic-popup/generic-popup.component';
import { PopupParams } from '../models/types/pop-up';
import { ModalRef } from '../models';

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

		overlayRef.attach(
			new ComponentPortal(GenericPopupComponent, null, injector),
		);

		return popoverRef;
	}

	private _createInjector(popoverRef: ModalRef, injector: Injector) {
		return Injector.create({
			parent: injector,
			providers: [{ provide: ModalRef, useValue: popoverRef }],
		});
	}

	private _getOverlayConfig<T>(params: PopupParams<T>): OverlayConfig {
		const backdropClass: string[] = ['ss-lib-overlay-backdrop'];

		if (params.isDarkOverlay) {
			backdropClass.push('ss-lib-overlay-backdrop--dark');
		}

		const panelClass: string[] = ['ss-lib-popover-root'];

		const positionStrategy: any = this.overlay
			.position()
			.global()
			.centerHorizontally()
			.centerVertically();

		return new OverlayConfig({
			hasBackdrop: !params.withoutBackdrop,
			width: params.width,
			minWidth: params.minWidth,
			maxWidth: params.maxWidth,
			maxHeight: params.maxHeight,
			height: params.height,
			backdropClass,
			panelClass,
			positionStrategy,
			scrollStrategy: this.overlay.scrollStrategies.reposition(),
		});
	}
}
