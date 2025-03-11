import type { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { ModalRefBase } from './modal.ref.base';
import type { PopupContent } from '../types/pop-up';
import type { PopupTypeEnum } from '../enums/popup-type-enum';
import type { IPopoverRef } from '../interfaces/pop-up';

export class ModalRef<T = any> extends ModalRefBase implements IPopoverRef<T> {
	public readonly afterDelete = new Subject<any>();
	public afterDelete$ = this.afterDelete.asObservable();
	constructor(
		public overlayRef: OverlayRef,
		public content: PopupContent,
		public data: T,
		public type: PopupTypeEnum,
	) {
		super();
	}

	public submit(data?: any): void {
		this.afterSubmit.next(data);
	}

	public delete(): void {
		this.afterDelete.next(null);
	}

	public close(): void {
		this.overlayRef.dispose();
		this.afterClosed.next(null);
	}
}
