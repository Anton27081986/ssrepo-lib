import { Component, input, TemplateRef } from '@angular/core';
import { CanvasContentComponent } from '../../../lib/components/canvas-content/canvas-content.component';

/**
 * Обертка для компонента CanvasContent.
 *
 * @description
 * Компонент-обертка для демонстрации
 * CanvasContent в Storybook.
 */
@Component({
	selector: 'ss-lib-canvas-content-wrapper',
	standalone: true,
	imports: [CanvasContentComponent],
	template: `
		<ss-lib-canvas-content
			[titleRef]="titleRef()"
			[buttonRef]="buttonRef()"
			[contentRef]="contentRef()"
			[viewHeader]="viewHeader()"
		>
			<ng-template #title>
				<h2>Заголовок</h2>
			</ng-template>
			<ng-template #button>
				<button>Кнопка</button>
			</ng-template>
			<ng-template #content>
				<div>Содержимое</div>
			</ng-template>
		</ss-lib-canvas-content>
	`,
})
export class CanvasContentWrapperComponent {
	/**
	 * Шаблон заголовка.
	 *
	 * @description
	 * Шаблон для отображения заголовка.
	 */
	public readonly titleRef = input<TemplateRef<{}> | null>(null);

	/**
	 * Шаблон кнопки.
	 *
	 * @description
	 * Шаблон для отображения кнопки.
	 */
	public readonly buttonRef = input<TemplateRef<{}> | null>(null);

	/**
	 * Шаблон содержимого.
	 *
	 * @description
	 * Шаблон для отображения основного содержимого.
	 */
	public readonly contentRef = input<TemplateRef<{}> | null>(null);

	/**
	 * Флаг отображения заголовка.
	 *
	 * @default true
	 * @description
	 * Определяет, отображать ли заголовок.
	 */
	public readonly viewHeader = input<boolean>(true);
}
