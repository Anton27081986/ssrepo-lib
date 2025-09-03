import type { OverlayRef } from '@angular/cdk/overlay';
import { ModalRefBase } from './modal.ref.base';
import type { PopupContent } from '../types/pop-up';
import type { PopupTypeEnum } from '../enums/popup-type-enum';
import type { IPopoverRef } from '../interfaces/pop-up';
import { PopoverAnimationEnum } from '../../../components/popover/popover.component';

export class ModalRef<T = unknown>
	extends ModalRefBase
	implements IPopoverRef<unknown>
{
	public startAnimate: PopoverAnimationEnum | null = null;

	constructor(
		public overlayRef: OverlayRef,
		public content: PopupContent,
		public data: T,
		public type: PopupTypeEnum,
	) {
		super();
	}

	public setAnimateState(v: PopoverAnimationEnum): void {
		this.startAnimate = v;
	}

	public submit(data?: unknown): void {
		this.afterSubmit.next(data);
		this.overlayRef.dispose();
	}

	public close(): void {
		this.overlayRef.dispose();
		this.afterClosed.next(null);
	}
}
