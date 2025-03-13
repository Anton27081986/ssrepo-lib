import { inject, Injectable, Injector } from '@angular/core';
import { GlobalPositionStrategy, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Toast } from '../models';
import { ToastComponent, ToastRef } from '../../components';

@Injectable({ providedIn: 'root' })
export class ToastService {
	private toastRef: ToastRef | undefined;
	private readonly overlay = inject(Overlay);
	private readonly parentInjector = inject(Injector);

	public show(data: Toast): ToastRef {
		if (this.toastRef) {
			this.toastRef.close();
		}

		const positionStrategy = this.getPositionStrategy();
		const overlayRef = this.overlay.create({ positionStrategy });

		this.toastRef = new ToastRef(overlayRef);

		const injector = this.getInjector(
			data,
			this.toastRef,
			this.parentInjector,
		);
		const toastPortal = new ComponentPortal(ToastComponent, null, injector);

		overlayRef.attach(toastPortal);

		return this.toastRef;
	}

	private getPositionStrategy(): GlobalPositionStrategy {
		return this.overlay
			.position()
			.global()
			.top('24px')
			.centerHorizontally();
	}

	private getInjector(
		data: Toast,
		toastRef: ToastRef,
		parentInjector: Injector,
	): PortalInjector {
		const tokens = new WeakMap();

		tokens.set(Toast, data);
		tokens.set(ToastRef, toastRef);

		return new PortalInjector(parentInjector, tokens);
	}
}
