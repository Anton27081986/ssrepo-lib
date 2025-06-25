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

import { TableColumnConfig } from '../../../../front-components/src/lib/components/table/models';
import { SsTableState } from '../../../../front-components/src/lib/components/table/services/insdex';
import { tableOperPlanExampleImports } from './table-oper-plan-example.imports';
import { operPlanMock } from './mock';
import { generateColumnOperPlanConfig } from './utils/generate-column-oper-plan-config';
import { IOperationPlanItem } from './model/oper-plan.interface';
import { createDragGhostExample } from './utils/create-drag-ghost-example';
import { BASE_COLUMN_MAP } from './constants/base-column-map';

@Component({
	selector: 'app-table-oper-plan-example',
	standalone: true,
	imports: [tableOperPlanExampleImports, CdkDropList, CdkDrag],
	templateUrl: './table-oper-plan-example.component.html',
	styleUrl: './table-oper-plan-example.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [SsTableState],
})
export class TableOperPlanExampleComponent implements OnInit {
	private readonly tableStateService = inject(
		SsTableState<IOperationPlanItem>,
	);

	public readonly data = this.tableStateService.data;
	public readonly dropdownColumns = this.tableStateService.dropdownColumns;
	public readonly visibleColumnsIds =
		this.tableStateService.visibleColumnsIds;

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
	protected readonly createDragGhostExample = createDragGhostExample;

	constructor() {
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
		const columnOperPlanConfig = generateColumnOperPlanConfig(operPlanMock);

		this.tableStateService.initialize(operPlanMock, columnOperPlanConfig);
	}

	public onDropdownItemDrop(event: CdkDragDrop<TableColumnConfig[]>): void {
		this.tableStateService.onDropdownItemDrop(
			event,
			this.dropdownColumnsVisible(),
			this.dropdownColumnsUnVisible(),
		);
	}

	public getMasterCheckboxIndeterminate(): boolean {
		return this.tableStateService.isMasterCheckboxIndeterminate();
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

	// Проверяем, является ли колонка подколонкой
	public isSubColumn(columnId: string): boolean {
		return this.visibleColumns().some(
			(column) =>
				column.subColumns && column.subColumns.includes(columnId),
		);
	}

	public formatColumnName(name: string): string {
		if (name.match(/^\d{2}-\d{2}$/)) {
			const [month, day] = name.split('-');

			return `${day}.${month}`;
		}

		return name;
	}

	public getSubColumnName(subColumnId: string): string {
		if (subColumnId.startsWith('planQuantity')) {
			return 'План';
		}

		if (subColumnId.startsWith('factQuantity')) {
			return 'Факт';
		}

		return subColumnId;
	}

	public isWeekColumnVisible(): boolean {
		return this.visibleColumns().some(
			(column) => column.id === 'planDays' && column.visible,
		);
	}

	public getCellValue(
		row: IOperationPlanItem,
		columnId: string,
	): string | number {
		const baseFieldHandler =
			BASE_COLUMN_MAP[columnId as keyof typeof BASE_COLUMN_MAP];

		if (baseFieldHandler) {
			return baseFieldHandler(row);
		}

		if (
			columnId.startsWith('planQuantity-') ||
			columnId.startsWith('factQuantity-')
		) {
			const [, date] = columnId.split('-'); // e.g., 'planQuantity-06-23' -> ['', '06-23']
			const formattedDate = `2025-${date}`; // Assuming year 2025 as per data
			const planDay = row.planDays.find((day) =>
				day.date.startsWith(formattedDate),
			);

			if (planDay) {
				return columnId.startsWith('planQuantity-')
					? planDay.planQuantity
					: planDay.factQuantity;
			}
		}

		return '';
	}
}
