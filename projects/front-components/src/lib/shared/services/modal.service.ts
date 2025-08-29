import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import {
	Injectable,
	Injector,
	TemplateRef,
	ViewContainerRef,
} from '@angular/core';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import {
	GenericPopupComponent,
	PopoverAnimationEnum,
} from '../../components/generic-popup/generic-popup.component';
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

	public open<T>(
		params: PopupParams<T>,
		viewContainerRef?: ViewContainerRef,
	): ModalRef<T> {
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
			parentElem.className = 'ss-lib-popup-global-scrolled';
		}

		// только для Modal / Panel используем GenericPopupComponent
		if (
			params.type === PopupTypeEnum.Modal ||
			params.type === PopupTypeEnum.Panel
		) {
			overlayRef.attach(
				new ComponentPortal(GenericPopupComponent, null, injector),
			);
		}

		// Popover — вставляем напрямую
		if (params.type === PopupTypeEnum.Popover) {
			if (params.content instanceof TemplateRef) {
				if (!viewContainerRef) {
					throw new Error(
						'viewContainerRef is required when using TemplateRef',
					);
				}

				overlayRef.attach(
					new TemplatePortal(params.content, viewContainerRef, {
						$implicit: params.data,
					}),
				);
			} else {
				overlayRef.attach(
					new ComponentPortal(params.content, null, injector),
				);
			}
		}

		if (params.type === PopupTypeEnum.Panel) {
			popoverRef.setAnimateState(PopoverAnimationEnum.panel);
		}

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
		const backdropClass: string[] = ['ss-lib-overlay-backdrop'];
		const panelClass: string[] = ['ss-lib-popover-root'];
		let positionStrategy;

		if (params.isDarkOverlay) {
			backdropClass.push('ss-lib-overlay-backdrop--dark');
		}

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
			panelClass.push('hc-popover-sidebar');

			positionStrategy = this.overlay
				.position()
				.flexibleConnectedTo(
					unwrapExpect(
						optionalDefined(document.getElementById('app-root')),
						'Not found app-root',
					),
				)
				.withPositions([
					{
						originX: 'end',
						originY: 'top',
						overlayX: 'end',
						overlayY: 'top',
					},
				])
				.withFlexibleDimensions(false)
				.withPush(false);
		}

		if (params.type === PopupTypeEnum.Popover) {
			if (!params.origin) {
				throw new Error('Popover requires origin element!');
			}

			positionStrategy = this.overlay
				.position()
				.flexibleConnectedTo(params.origin)
				.withPositions([
					{
						originX: 'start',
						originY: 'bottom',
						overlayX: 'start',
						overlayY: 'top',
						offsetY: 8,
					},
					{
						originX: 'end',
						originY: 'bottom',
						overlayX: 'end',
						overlayY: 'top',
						offsetY: 8,
					},
				])
				.withFlexibleDimensions(false)
				.withPush(false);
		}

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
