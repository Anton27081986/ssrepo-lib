import type { InputSignal, TemplateRef } from '@angular/core';
import { Component, input, output } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ScrollableBlockComponent } from '../scrollable-block/scrollable-block.component';
import { CanvasState } from './canvas.state';
import type { IMenu } from '../../shared/models';

/**
 * Компонент холста с поддержкой боковых меню и настраиваемой прокруткой
 *
 * @example
 * ```html
 * Параметры:
 *
 * [leftMenuHeaderTemplateRef]: TemplateRef - Шаблон заголовка левого меню - обязательный
 *
 * [rightMenuHeaderTemplateRef]: TemplateRef - Шаблон заголовка правого меню - обязательный
 *
 * [contentScrollHorizontal]: boolean - Горизонтальная прокрутка контента -
 * необязательный, по умолчанию: false
 *
 * [contentScrollVertical]: boolean - Вертикальная прокрутка контента -
 * необязательный, по умолчанию: true
 *
 * [menu]: IMenu[] - Массив элементов меню - обязательный
 *
 * (outMenuFromCanvas): IMenu - Событие выбора пункта меню
 *
 * <ss-lib-canvas
 *   [leftMenuHeaderTemplateRef]="leftHeaderTemplate"
 *   [rightMenuHeaderTemplateRef]="rightHeaderTemplate"
 *   [contentScrollHorizontal]="false"
 *   [contentScrollVertical]="true"
 *   [menu]="menuItems"
 *   (outMenuFromCanvas)="onMenuSelect($event)"
 * ></ss-lib-canvas>
 * ```
 */
@Component({
	selector: 'ss-lib-canvas',
	templateUrl: './canvas.component.html',
	styleUrls: ['./canvas.component.scss'],
	providers: [CanvasState],
	imports: [HeaderComponent, SidebarComponent, ScrollableBlockComponent],
	standalone: true,
})
export class CanvasComponent {
	public readonly leftMenuHeaderTemplateRef: InputSignal<TemplateRef<{}> | null> =
		input.required();

	public readonly rightMenuHeaderTemplateRef: InputSignal<TemplateRef<{}> | null> =
		input.required();

	public readonly outMenuFromCanvas = output<IMenu>();

	public readonly contentScrollHorizontal: InputSignal<boolean> =
		input(false);

	public readonly contentScrollVertical: InputSignal<boolean> = input(true);
	public readonly menu: InputSignal<IMenu[]> = input.required<IMenu[]>();
}
