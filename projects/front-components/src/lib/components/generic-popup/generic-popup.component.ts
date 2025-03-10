import type { Type } from '@angular/core';
import { Component } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import type { ModalRef } from '../../shared/models/utils/modal.ref';
import type { PopupContent, TypePopup } from '../../shared/models/types/pop-up';

export enum PopoverAnimationEnum {
	default = 'default',
	menu = 'menu',
}

@Component({
	selector: 's-lib-generic-popup',
	standalone: true,
	templateUrl: './generic-popup.component.html',
	styleUrls: ['./generic-popup.component.scss'],
	imports: [NgComponentOutlet],
})
export class GenericPopupComponent {
	public content: PopupContent;
	public type: TypePopup;

	get component() {
		return this.content as Type<any>;
	}

	constructor(public popoverRef: ModalRef) {
		this.type = this.popoverRef.type;
		this.content = this.popoverRef.content;
	}

	public preventClick($event: Event) {
		$event.stopImmediatePropagation();
	}
}
