import {
	ChangeDetectionStrategy,
	Component,
	computed,
	contentChildren,
	forwardRef,
	inject,
} from '@angular/core';
import { JsonPipe, NgTemplateOutlet } from "@angular/common";
import { TableCellDirective, TableDirective } from '../directives';

@Component({
	selector: 'tr[ssTr]',
	imports: [NgTemplateOutlet, JsonPipe],
	templateUrl: './tr.component.html',
	styleUrl: './tr.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrComponent<T extends Partial<Record<keyof T, never>>> {
	public readonly cells = contentChildren(TableCellDirective);

	protected readonly table = inject<TableDirective<T>>(
		forwardRef(() => TableDirective),
	);

	public readonly cellByKey = computed(() => {
		return this.cells().reduce(
			(record, item) => ({ ...record, [item.ssCell()]: item }),
			{} as Record<string | keyof T, TableCellDirective>,
		);
	});
}
