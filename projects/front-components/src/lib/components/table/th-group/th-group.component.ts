import {
	ChangeDetectionStrategy,
	Component,
	computed,
	contentChild,
	contentChildren,
	forwardRef,
	inject,
	Signal,
} from '@angular/core';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { TableDirective, TableHeadDirective } from '../directives';
import { ThComponent } from '../th/th.component';

@Component({
	selector: 'tr[ssThGroup]',
	standalone: true,
	imports: [NgTemplateOutlet, NgIf],
	templateUrl: './th-group.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableThGroupComponent<T extends Partial<Record<keyof T, never>>> {
	protected readonly table = inject<TableDirective<T>>(
		forwardRef(() => TableDirective),
	);

	public readonly th = contentChild(ThComponent);
	public readonly heads = contentChildren(TableHeadDirective<T>);

	public readonly headByKey: Signal<Record<keyof T, TableHeadDirective<T>>> =
		computed(() => {
			return this.heads().reduce(
				(record, item) => ({ ...record, [item.ssHead()]: item }),
				{} as Record<keyof T, TableHeadDirective<T>>,
			);
		});
}
