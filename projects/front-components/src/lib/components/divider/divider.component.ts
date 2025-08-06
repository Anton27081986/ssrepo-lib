import type { InputSignal } from '@angular/core';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	ViewEncapsulation,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { Orientation } from '../../shared/models';

/**
 * Компонент-разделитель с поддержкой вертикальной и горизонтальной ориентации
 *
 * @example
 * ```html
 * Параметры:
 *
 * [direction]: 'vertical' | 'horizontal' - Направление разделителя - необязательный,
 * по умолчанию: horizontal
 *
 * <ss-lib-divider
 *   [direction]="'horizontal'"
 * ></ss-lib-divider>
 * ```
 */
@Component({
	selector: 'ss-lib-divider',
	standalone: true,
	imports: [NgClass],
	template: `
		<div
			class="divider"
			[ngClass]="orientation()"
		></div>
	`,
	styleUrls: ['divider.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerComponent {
	public readonly orientation: InputSignal<Orientation> = input<Orientation>(
		Orientation.Horizontal,
	);
}
