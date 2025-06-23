import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	OnInit,
} from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { FormControl } from '@angular/forms';
import {
	Align,
	Colors,
	IconType,
	TextType,
	TextWeight,
} from '../../../../front-components/src/lib/shared/models';

import { columnConfigsMock, tableDataMock } from './mock';
import { TableColumnConfig } from '../../../../front-components/src/lib/components/table/models';
import { SsTableState } from '../../../../front-components/src/lib/components/table/services/insdex';
import { tableExampleImports } from './table-example.imports';

interface TableRow {
	id: number;
	dragAction: string;
	order: string;
	image: string;
	banner: string;
	status: string;
	actionToggle: string;
	user: string;
	period: string;
	action: string;
}

@Component({
	selector: 'app-table-example',
	standalone: true,
	imports: [tableExampleImports, CdkDropList, CdkDrag],
	templateUrl: './table-example.component.html',
	styleUrl: './table-example.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [SsTableState],
})
export class TableExampleComponent implements OnInit {
	private readonly tableStateService = inject(SsTableState<TableRow>);

	public readonly data = this.tableStateService.data;
	public readonly dropdownColumns = this.tableStateService.dropdownColumns;
	public readonly visibleColumns = this.tableStateService.visibleColumns;
	public readonly masterCheckboxCtrl =
		this.tableStateService.getMasterCheckboxCtrl();

	public readonly dropdownColumnsVisible = computed(() =>
		this.dropdownColumns().filter((item) => item.visible === true),
	);

	public readonly dropdownColumnsUnVisible = computed(() =>
		this.dropdownColumns().filter((item) => item.visible === false),
	);

	public readonly rowCheckboxes = this.tableStateService.getRowCheckboxes();
	public readonly columnsForm = this.tableStateService.getColumnsForm();

	protected readonly TextType = TextType;
	protected readonly TextWeight = TextWeight;
	protected readonly Colors = Colors;
	protected readonly IconType = IconType;
	protected readonly Align = Align;

	constructor() {
		// toSignal(
		// 	this.columnsForm.valueChanges.pipe(
		// 		tap((values: Partial<{ [p: string]: boolean }>) =>
		// 			this.tableStateService.updateColumnsVisibility(
		// 				values as ColumnVisibility,
		// 			),
		// 		),
		// 	),
		// );

		toSignal(
			this.masterCheckboxCtrl.valueChanges.pipe(
				tap((value: boolean | null) =>
					this.tableStateService.onMasterCheckboxChange(value),
				),
			),
		);

		toSignal(
			this.rowCheckboxes.valueChanges.pipe(
				tap(() => {
					this.tableStateService.updateMasterCheckboxState();
				}),
			),
		);
	}

	public ngOnInit(): void {
		this.initializeData();
	}

	private initializeData(): void {
		this.tableStateService.initialize(tableDataMock, columnConfigsMock);
	}

	public onDropdownItemDrop(event: CdkDragDrop<TableColumnConfig[]>): void {
		this.tableStateService.onDropdownItemDrop(event);
	}

	public getRowCheckboxControl(index: number): FormControl {
		return this.tableStateService.getRowCheckboxControl(index);
	}

	public getControlForColumn(column: TableColumnConfig): FormControl {
		return this.tableStateService.getControlForColumn(column);
	}

	public updateColumnVisibility(column: TableColumnConfig): void {
		const isVisible = !column.visible;

		this.tableStateService.updateColumnVisibility(column, isVisible);
	}

	public createDragGhostExample(
		originalRow: HTMLElement,
		rect: DOMRect,
	): HTMLElement {
		const table = document.createElement('table');
		const tbody = document.createElement('tbody');
		const clonedRow = originalRow.cloneNode(true) as HTMLTableRowElement;
		const originalCells = originalRow.querySelectorAll('td');
		const clonedCells = clonedRow.querySelectorAll('td');

		table.style.cssText = `
			border-collapse: collapse;
			position: absolute;
			top: -9999px;
			left: -9999px;
			width: ${rect.width}px;
		`;
		clonedRow.style.cssText = `
			background: var(--surface-primary);
			box-shadow: 0px 2px 2px -1px var(--effects-shadows-4),
						0px 4px 6px -2px var(--effects-shadows-3),
						0px 12px 16px -4px var(--effects-shadows-8);
			pointer-events: none;
		`;

		originalCells.forEach((cell: HTMLTableCellElement, index: number) => {
			const width = cell.getBoundingClientRect().width;

			if (clonedCells[index]) {
				(clonedCells[index] as HTMLElement).style.width = `${width}px`;
			}
		});

		tbody.appendChild(clonedRow);
		table.appendChild(tbody);

		return table;
	}
}
