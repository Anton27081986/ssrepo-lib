import {
	ChangeDetectionStrategy,
	Component,
	computed,
	contentChildren,
	forwardRef,
	inject,
	Signal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TableDirective, TableHeadDirective } from '../directives';
import { ThComponent } from '../th/th.component';

@Component({
	selector: 'tr[ssThGroup]',
	imports: [NgTemplateOutlet, ThComponent],
	templateUrl: './th-group.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableThGroupComponent<T extends Partial<Record<keyof T, any>>> {
	public readonly heads = contentChildren(TableHeadDirective<T>);
	protected readonly table = inject<TableDirective<T>>(
		forwardRef(() => TableDirective),
	);

	public readonly heads123: Signal<Record<keyof T, TableHeadDirective<T>>> =
		computed(() => {
			return this.heads().reduce(
				(record, item) => {
					record[item.ssHead() as keyof T] = item;

					return record;
				},
				{} as Record<keyof T, TableHeadDirective<T>>,
			);
		});
}
