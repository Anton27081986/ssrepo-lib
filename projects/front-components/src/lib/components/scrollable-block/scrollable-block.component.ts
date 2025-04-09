import { Component, input, ViewEncapsulation } from '@angular/core';

/**
 * Компонент прокручиваемого блока с настраиваемой прокруткой
 *
 * @example
 * ```html
 * Параметры:
 *
 * [horizontalScroll]: boolean - Флаг включения горизонтальной прокрутки -
 * необязательный, по умолчанию: false
 *
 * [verticalScroll]: boolean - Флаг включения вертикальной прокрутки -
 * необязательный, по умолчанию: false
 *
 * [disableAutoSize]: boolean - Флаг отключения автоматического определения размеров -
 * необязательный, по умолчанию: false
 *
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
		'[class.scrollable-block--h-hidden]': 'horizontalScroll()',
		'[class.scrollable-block--v-hidden]': '!verticalScroll()',
		'[class.scrollable-block--not-auto-size]': 'disableAutoSize()',
	},
})
export class ScrollableBlockComponent {
	public readonly horizontalScroll = input<boolean>(false);
	public readonly verticalScroll = input<boolean>(false);
	public readonly disableAutoSize = input<boolean>(false);
}
