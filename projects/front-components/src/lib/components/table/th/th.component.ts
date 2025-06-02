import {
	ChangeDetectionStrategy,
	Component,
	input,
	signal,
} from '@angular/core';
import { TableResizedDirective } from '../directives';

@Component({
	selector: 'th[ssTh]',
	standalone: true,
	imports: [TableResizedDirective],
	template: `
		
		<ng-content />

		@if (resizable()) {
			<div
				class="t-bar"
				(ssResized)="onResized($event)"
			></div>
		}
	`,
	styleUrl: './th.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[style.min-width.px]': 'width()',
		'[style.width.px]': 'width()',
		'[style.max-width.px]': 'width()',
	},
})
export class ThComponent {
	public readonly resizable = input<boolean>(false);

	protected width = signal<number | null>(null);

	protected onResized(width: number): void {
		this.width.set(width);
	}
}
