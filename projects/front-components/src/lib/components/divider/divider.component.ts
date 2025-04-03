import type { InputSignal } from '@angular/core';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	ViewEncapsulation,
} from '@angular/core';
import { Orientation } from '../../shared/models';

/**
 * Параметры:
 *
 * [direction]: 'vertical' | 'horizontal' - direction. По умолчанию: `horizontal`
 */
@Component({
	selector: 'ss-lib-divider',
	template: `
		<div
			class="divider"
			[class.divider--horizontal]="orientation() === 'horizontal'"
			[class.divider--vertical]="orientation() === 'vertical'"
		></div>
	`,
	styleUrls: ['divider.component.scss'],
	standalone: true,
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerComponent {
	public readonly orientation: InputSignal<Orientation> = input<Orientation>(
		Orientation.Horizontal,
	);
}
