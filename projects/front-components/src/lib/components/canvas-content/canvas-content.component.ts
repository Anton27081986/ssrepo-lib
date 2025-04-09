import { input, InputSignal, TemplateRef } from '@angular/core';
import { Component } from '@angular/core';
import { NgIf, NgTemplateOutlet } from '@angular/common';

/**
 * Компонент контента холста с настраиваемыми шаблонами заголовка и содержимого
 *
 * @example
 * ```html
 * Параметры:
 *
 * [titleRef]: TemplateRef - Шаблон заголовка - обязательный
 *
 * [buttonRef]: TemplateRef - Шаблон кнопки - обязательный
 *
 * [contentRef]: TemplateRef - Шаблон контента - обязательный
 *
 * [viewHeader]: boolean - Отображение заголовка - необязательный,
 * по умолчанию: true
 *
 * <ss-lib-canvas-content
 *   [titleRef]="titleTemplate"
 *   [buttonRef]="buttonTemplate"
 *   [contentRef]="contentTemplate"
 *   [viewHeader]="true"
 * ></ss-lib-canvas-content>
 * ```
 */
@Component({
	selector: 'ss-lib-canvas-content',
	standalone: true,
	templateUrl: './canvas-content.component.html',
	imports: [NgTemplateOutlet, NgIf],
	styleUrl: './canvas-content.component.scss',
})
export class CanvasContentComponent {
	public titleRef: InputSignal<TemplateRef<{}> | null> = input.required();
	public buttonRef: InputSignal<TemplateRef<{}> | null> = input.required();
	public contentRef: InputSignal<TemplateRef<{}> | null> = input.required();
	public viewHeader: InputSignal<boolean> = input<boolean>(true);
}
