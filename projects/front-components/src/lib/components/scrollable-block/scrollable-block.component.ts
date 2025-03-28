import { Component, Input, ViewEncapsulation } from '@angular/core';

/**
 * Компонент прокручиваемого блока.
 *
 * Предоставляет контейнер с настраиваемой прокруткой по горизонтали
 * и вертикали. Поддерживает автоматическое определение размеров
 * и возможность их отключения.
 *
 * @example
 * ```html
 * <ss-lib-scrollable-block
 *   [horizontalScroll]="true"
 *   [verticalScroll]="true"
 *   [disableAutoSize]="false"
 * >
 *   <div>Контент для прокрутки</div>
 * </ss-lib-scrollable-block>
 * ```
 */
@Component({
	selector: 'ss-lib-scrollable-block',
	templateUrl: './scrollable-block.component.html',
	standalone: true,
	styleUrls: ['./scrollable-block.component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'scrollable-block',
		'[class.scrollable-block--h-hidden]': 'horizontalScroll',
		'[class.scrollable-block--v-hidden]': '!verticalScroll',
		'[class.scrollable-block--not-auto-size]': 'disableAutoSize',
	},
})
export class ScrollableBlockComponent {
	/**
	 * Флаг включения горизонтальной прокрутки.
	 *
	 * @default false
	 * @description
	 * При значении true скрывает горизонтальную полосу прокрутки.
	 */
	@Input()
	public readonly horizontalScroll = false;

	/**
	 * Флаг включения вертикальной прокрутки.
	 *
	 * @default false
	 * @description
	 * При значении false скрывает вертикальную полосу прокрутки.
	 */
	@Input()
	public readonly verticalScroll = false;

	/**
	 * Флаг отключения автоматического определения размеров.
	 *
	 * @default false
	 * @description
	 * При значении true отключает автоматическое определение
	 * размеров контейнера.
	 */
	@Input()
	public readonly disableAutoSize = false;
}
