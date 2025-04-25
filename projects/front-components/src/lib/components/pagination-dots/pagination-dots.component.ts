import {
	ChangeDetectionStrategy,
	Component,
	input,
	model,
} from '@angular/core';
import { RepeatTimesPipe } from '../../core/pipes';

@Component({
	selector: 'ss-lib-pagination-dots',
	imports: [RepeatTimesPipe],
	templateUrl: './pagination-dots.component.html',
	styleUrl: './pagination-dots.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationDotsComponent {
	public readonly index = model.required<number>();
	public readonly length = input(1);

	public onIndex(index: number): void {
		this.index.set(index);
	}
}
