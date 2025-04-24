import type { OnInit, Type } from '@angular/core';
import { Component } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import {
	animate,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';
import { ModalRef } from '../../shared/models';
import { PopupContent, TypePopup } from '../../shared/models/types/pop-up';

export enum PopoverAnimationEnum {
	default = 'default',
	menu = 'menu',
	panel = 'panel',
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
	animations: [
		trigger('openPanel', [
			state(
				PopoverAnimationEnum.panel,
				style({
					transform: 'translate(100%, 0)',
				}),
			),
			state(
				PopoverAnimationEnum.default,
				style({
					opacity: 1,
					transform: 'translate(0, 0) scale(1)',
				}),
			),
			transition(
				`${PopoverAnimationEnum.panel} => ${PopoverAnimationEnum.default}`,
				animate('300ms'),
			),
		]),
	],
})
export class GenericPopupComponent implements OnInit {
	public readonly content: PopupContent;
	public readonly type: TypePopup;
	protected state: PopoverAnimationEnum = PopoverAnimationEnum.default;

	constructor(private readonly popoverRef: ModalRef) {
		this.type = this.popoverRef.type;
		this.content = this.popoverRef.content;
	}

	public ngOnInit(): void {
		this.state =
			this.popoverRef.startAnimate ?? PopoverAnimationEnum.default;

		if (this.state !== PopoverAnimationEnum.default) {
			setTimeout(() => {
				this.state = PopoverAnimationEnum.default;
			}, 0);
		}
	}

	public get component(): Type<{}> {
		return this.content as Type<{}>;
	}

	public preventClick($event: Event): void {
		$event.stopImmediatePropagation();
	}
}
