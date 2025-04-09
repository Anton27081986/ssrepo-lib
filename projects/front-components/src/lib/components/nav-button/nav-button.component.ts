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
import type { IMenu } from '../../shared/models';
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
	public readonly IconType = IconType;
	public readonly type = input<NavButton>(NavButton.NavBase);
	public readonly menu = input.required<IMenu>();
	protected readonly NuvButtonType = NavButton;
	protected readonly TextType = TextType;
	protected readonly TextWeight = TextWeight;
}
