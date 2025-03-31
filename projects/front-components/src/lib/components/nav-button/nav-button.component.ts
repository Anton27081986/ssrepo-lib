import type { InputSignal } from '@angular/core';
import { Component, input, ViewEncapsulation } from '@angular/core';
import {
	animate,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';
import { NgIf } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import type { IMenu, NavButtonType } from '../../shared/models';
import { IconType, NavButton, TextType, TextWeight } from '../../shared/models';
import { TextComponent } from '../text/text.component';

/**
 * Компонент навигационной кнопки.
 *
 * Предоставляет кнопку навигации с поддержкой иконок, текста и
 * анимированного раскрывающегося меню. Поддерживает различные
 * типы отображения и стили текста.
 *
 * @example
 * ```html
 * <ss-lib-nav-button
 *   [type]="NavButton.NavBase"
 *   [menu]="{ title: 'Меню', items: [...] }"
 * />
 * ```
 */
@Component({
	selector: 'ss-lib-nav-button',
	templateUrl: './nav-button.component.html',
	standalone: true,
	styleUrls: ['./nav-button.component.scss'],
	encapsulation: ViewEncapsulation.None,
	animations: [
		trigger('expendedPanel', [
			state('view', style({ display: 'flex' })),
			state('hidden', style({ display: 'none' })),
			transition('initial <=> hidden', animate('0.3s')),
		]),
	],
	imports: [IconComponent, TextComponent, NgIf],
})
export class NavButtonComponent {
	/**
	 * Константы для типов иконок.
	 *
	 * @description
	 * Используется для отображения различных иконок
	 * в навигационной кнопке.
	 */
	public IconType = IconType;

	/**
	 * Тип навигационной кнопки.
	 *
	 * @default NavButton.NavBase
	 * @description
	 * Определяет внешний вид и поведение кнопки.
	 * Поддерживает различные типы отображения.
	 */
	public type: InputSignal<NavButtonType> = input<NavButton>(
		NavButton.NavBase,
	);

	/**
	 * Конфигурация меню.
	 *
	 * @description
	 * Обязательный параметр, содержащий структуру
	 * и элементы меню.
	 */
	public menu: InputSignal<IMenu> = input.required<IMenu>();

	/**
	 * Константы для типов навигационных кнопок.
	 *
	 * @description
	 * Используется для определения доступных типов
	 * навигационных кнопок.
	 */
	protected NuvButtonType = NavButton;

	/**
	 * Константы для типов текста.
	 *
	 * @description
	 * Используется для стилизации текста в кнопке.
	 */
	protected TextType = TextType;

	/**
	 * Константы для весов текста.
	 *
	 * @description
	 * Используется для определения толщины шрифта
	 * текста в кнопке.
	 */
	protected TextWeight = TextWeight;
}
