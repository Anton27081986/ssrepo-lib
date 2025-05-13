import {
	ChangeDetectionStrategy,
	Component,
	computed,
	contentChildren,
	forwardRef,
	inject,
	Signal,
} from '@angular/core';
import {
	TableCellDirective,
	TableDirective,
	TableHeadDirective,
} from '../directives';
import { NgTemplateOutlet } from '@angular/common';

@Component({
	selector: 'tr[ssTr]',
	imports: [NgTemplateOutlet],
	templateUrl: './tr.component.html',
	styleUrl: './tr.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrComponent<T extends Partial<Record<keyof T, any>>> {
	public readonly cells = contentChildren(TableCellDirective);

	protected readonly table = inject<TableDirective<T>>(
		forwardRef(() => TableDirective),
	);

	public readonly cell123 = computed(() => {
		return this.cells().reduce(
			(record, item) => ({ ...record, [item.ssCell()]: item }),
			{} as Record<string | keyof T, TableCellDirective>,
		);
	});

	public test = computed(() => {
		console.log(this.cell123());
	});
}
