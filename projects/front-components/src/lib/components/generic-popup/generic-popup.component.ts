import type { Type } from '@angular/core';
import { Component } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { ModalRef } from '../../shared/models';
import { PopupContent, TypePopup } from '../../shared/models/types/pop-up';

export enum PopoverAnimationEnum {
	default = 'default',
	menu = 'menu',
}

/**
 * Компонент для отображения всплывающих окон с поддержкой анимаций и типов
 *
 * @example
 * ```html
 * Параметры:
 *
 * content: PopupContent - Содержимое всплывающего окна - обязательный,
 * по умолчанию: null
 *
 * type: TypePopup - Тип всплывающего окна - обязательный,
 * по умолчанию: TypePopup.Default
 *
 * Методы:
 * preventClick($event: Event) - Предотвращает всплытие события клика
 *
 * <s-lib-generic-popup
 *   [content]="myComponent"
 *   [type]="TypePopup.Default"
 *   (click)="preventClick($event)"
 * >
 * </s-lib-generic-popup>
 * ```
 */
@Component({
	selector: 's-lib-generic-popup',
	standalone: true,
	templateUrl: './generic-popup.component.html',
	styleUrls: ['./generic-popup.component.scss'],
	imports: [NgComponentOutlet],
})
export class GenericPopupComponent {
	public readonly content: PopupContent;
	public readonly type: TypePopup;

	constructor(private readonly popoverRef: ModalRef) {
		this.type = this.popoverRef.type;
		this.content = this.popoverRef.content;
	}

	public get component(): Type<{}> {
		return this.content as Type<{}>;
	}

	public preventClick($event: Event): void {
		$event.stopImmediatePropagation();
	}
}
