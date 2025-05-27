import {
	ChangeDetectionStrategy,
	Component,
	computed,
	OnInit,
	signal,
} from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import {
	CheckboxComponent,
	DropdownItemComponent,
	DropdownListComponent,
	TableCellDirective,
	TableDirective,
	TableHeadDirective,
	TableThGroupComponent,
	ThComponent,
	TrComponent,
} from '../../../../front-components/src/lib/components';
import { TableColumnConfig } from '../../../../front-components/src/lib/components/table/models/table-column-config';
import { DraggableItemDirective } from '../../../../front-components/src/lib/core/directives';
import {
	Align,
	Colors,
	IconType,
	TextType,
	TextWeight,
} from '../../../../front-components/src/lib/shared/models';

import {
	IconComponent,
	TextComponent,
	UtilityButtonComponent,
} from '../../../../front-components/src/lib/components';

import { PopoverTriggerForDirective } from '../../../../front-components/src/lib/core/directives';

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
	imports: [
		CheckboxComponent,
		DraggableItemDirective,
		DropdownItemComponent,
		DropdownListComponent,
		UtilityButtonComponent,
		PopoverTriggerForDirective,
		ReactiveFormsModule,
		TextComponent,
		IconComponent,
		ThComponent,
		TrComponent,
		DraggableItemDirective,
		TableDirective,
		TableCellDirective,
		TableHeadDirective,
		TableThGroupComponent,
	],
	templateUrl: './table-example.component.html',
	styleUrl: './table-example.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableExampleComponent implements OnInit {
	// Constants
	protected readonly TextType = TextType;
	protected readonly TextWeight = TextWeight;
	protected readonly Colors = Colors;
	protected readonly IconType = IconType;
	protected readonly Align = Align;

	// Table data
	public readonly tableData: TableRow[] = [
		{
			id: 1,
			dragAction: 'dragAction',
			order: 'order',
			image: 'image',
			banner: 'banner',
			status: 'status',
			actionToggle: 'actionToggle',
			user: 'user',
			period: 'period',
			action: 'action',
		},
		{
			id: 2,
			dragAction: 'dragAction',
			order: 'order',
			image: 'image',
			banner: 'banner',
			status: 'status',
			actionToggle: 'actionToggle',
			user: 'user',
			period: 'period',
			action: 'action',
		},
		{
			id: 3,
			dragAction: 'dragAction',
			order: 'order',
			image: 'image',
			banner: 'banner',
			status: 'status',
			actionToggle: 'actionToggle',
			user: 'user',
			period: 'period',
			action: 'action',
		},
	];

	// Signals
	public readonly columnConfigs = signal<TableColumnConfig[]>([
		{
			id: 'dragAction',
			name: 'Drag Action',
			showInDropdown: true,
			visible: true,
		},
		{
			id: 'banner',
			name: 'Banner',
			showInDropdown: true,
			visible: true,
			subColumns: ['order', 'image'],
		},
		{ id: 'order', name: 'Order', showInDropdown: false, visible: true },
		{ id: 'image', name: 'Image', showInDropdown: false, visible: true },
		{ id: 'status', name: 'Status', showInDropdown: true, visible: true },
		{
			id: 'actionToggle',
			name: 'Action Toggle',
			showInDropdown: true,
			visible: true,
			subColumns: ['user', 'period'],
		},
		{ id: 'user', name: 'User', showInDropdown: false, visible: true },
		{ id: 'period', name: 'Period', showInDropdown: false, visible: true },
		{ id: 'action', name: 'Action', showInDropdown: true, visible: true },
	]);

	protected readonly columns = signal<string[]>([
		'dragAction',
		'order',
		'image',
		'banner',
		'status',
		'actionToggle',
		'user',
		'period',
		'action',
	]);

	// Computed signals
	public readonly dropdownColumns = computed(() =>
		this.columnConfigs().filter((col) => col.showInDropdown),
	);

	public readonly visibleColumns = computed(() =>
		this.columnConfigs()
			.filter((col) => col.visible)
			.map((col) => col.id),
	);

	public readonly data = computed(() => this.tableData);

	// Forms
	public readonly masterCheckboxControl = new FormControl<boolean>(false, {
		nonNullable: true,
	});

	public readonly rowCheckboxes = new FormArray<FormControl<boolean>>([]);
	public readonly columnsForm = new FormArray<FormControl<boolean>>(
		this.columnConfigs().map(
			() => new FormControl<boolean>(true, { nonNullable: true }),
		),
	);

	// Computed checkbox states
	private readonly checkedRowsCount = computed(
		() =>
			this.rowCheckboxes.controls.filter((control) => control.value)
				.length,
	);

	private readonly totalRowsCount = computed(
		() => this.rowCheckboxes.controls.length,
	);

	public readonly isAllSelected = computed(
		() =>
			this.checkedRowsCount() === this.totalRowsCount() &&
			this.totalRowsCount() > 0,
	);

	public readonly isIndeterminate = computed(
		() =>
			this.checkedRowsCount() > 0 &&
			this.checkedRowsCount() < this.totalRowsCount(),
	);

	constructor() {
		toSignal(
			this.columnsForm.valueChanges.pipe(
				tap((values: Array<boolean | null>) =>
					this.updateColumnVisibility(values),
				),
			),
			{
				initialValue: this.columnConfigs().map(
					(config) => config.visible,
				),
			},
		);

		toSignal(
			this.masterCheckboxControl.valueChanges.pipe(
				tap((value: boolean | null) =>
					this.onMasterCheckboxChange(value),
				),
			),
		);

		toSignal(
			this.rowCheckboxes.valueChanges.pipe(
				tap(() => {
					this.onRowCheckboxChange();
				}),
			),
		);
	}

	ngOnInit() {
		this.initializeCheckboxes();
	}

	// Инициализация checkbox'ов для каждой строки
	private initializeCheckboxes() {
		this.tableData.forEach(() => {
			this.rowCheckboxes.push(
				new FormControl<boolean>(false, { nonNullable: true }),
			);
		});
	}

	// Получение FormControl для checkbox'а конкретной строки
	getRowCheckboxControl(index: number): FormControl {
		return this.rowCheckboxes.at(index) as FormControl;
	}

	private onMasterCheckboxChange(value: boolean | null): void {
		this.rowCheckboxes.controls.forEach((control: FormControl) => {
			control.setValue(value, { emitEvent: false });
		});
	}

	// Обработка изменения checkbox'а в строке
	onRowCheckboxChange() {
		this.updateMasterCheckboxState();
	}

	// Обновление состояния главного checkbox'а на основе состояния строк
	private updateMasterCheckboxState() {
		const checkedCount = this.rowCheckboxes.controls.filter(
			(control: FormControl) => control.value,
		).length;

		const totalCount = this.rowCheckboxes.controls.length;

		if (checkedCount === 0) {
			console.log(0);
			// Никто не выбран
			this.masterCheckboxControl.setValue(false, { emitEvent: false });
		} else if (checkedCount === totalCount) {
			// Все выбраны

			console.log(1);
			this.masterCheckboxControl.setValue(true, { emitEvent: false });
		} else {
			// Частично выбраны - можно установить indeterminate состояние
			console.log(2);
			this.masterCheckboxControl.setValue(false, { emitEvent: false });
			// Если ваша библиотека поддерживает indeterminate состояние:
			// this.setIndeterminateState(true);
		}
	}

	// Получение выбранных элементов
	// getSelectedItems() {
	// 	const selectedItems: any[] = [];
	// 	this.rowCheckboxes.controls.forEach(
	// 		(control: FormControl, index: number) => {
	// 			if (control.value) {
	// 				selectedItems.push(this.tableData[index]);
	// 			}
	// 		},
	// 	);
	// 	return selectedItems;
	// }

	public onDropItem(event: CdkDragDrop<TableColumnConfig>): void {
		const dropdownCols = this.dropdownColumns();
		const allConfigs = [...this.columnConfigs()];
		const draggedColumn = dropdownCols[event.previousIndex];

		const draggedGroup = this.collectWithSubColumns(
			draggedColumn,
			allConfigs,
		);
		const updatedConfigs = this.removeColumns(allConfigs, draggedGroup);
		const targetIndex = this.findTargetIndex(
			event,
			dropdownCols,
			allConfigs,
		);

		updatedConfigs.splice(targetIndex, 0, ...draggedGroup);
		this.columnConfigs.set(updatedConfigs);
	}

	private collectWithSubColumns(
		parent: TableColumnConfig,
		allConfigs: TableColumnConfig[],
	): TableColumnConfig[] {
		const group = [parent];

		if (parent.subColumns?.length) {
			const subCols = parent.subColumns
				.map((subId) => allConfigs.find((col) => col.id === subId))
				.filter((col): col is TableColumnConfig => !!col);

			group.push(...subCols);
		}

		return group;
	}

	private removeColumns(
		source: TableColumnConfig[],
		toRemove: TableColumnConfig[],
	): TableColumnConfig[] {
		const removeIds = new Set(toRemove.map((col) => col.id));

		return source.filter((col) => !removeIds.has(col.id));
	}

	private findTargetIndex(
		event: CdkDragDrop<TableColumnConfig>,
		dropdownCols: TableColumnConfig[],
		allConfigs: TableColumnConfig[],
	): number {
		if (event.currentIndex === 0) {
			return allConfigs.findIndex((col) => col.showInDropdown);
		}

		if (event.currentIndex >= dropdownCols.length - 1) {
			const visibleIndices = allConfigs
				.map((col, index) => (col.showInDropdown ? index : -1))
				.filter((index) => index !== -1);

			return visibleIndices[visibleIndices.length - 1] + 1;
		}

		const targetColumn = dropdownCols[event.currentIndex];

		return allConfigs.findIndex((col) => col.id === targetColumn.id);
	}

	public onItemDrop(itemPosition: unknown): void {
		console.log(itemPosition);
	}

	private updateColumnVisibility(values: Array<boolean | null>): void {
		const dropdownColumns = this.dropdownColumns();

		this.columnConfigs.update((configs) => {
			const updatedConfigs = [...configs];

			dropdownColumns.forEach((dropdownItem) => {
				const configIdx = updatedConfigs.findIndex(
					(column: TableColumnConfig) =>
						column.id === dropdownItem.id,
				);

				if (configIdx === -1) {
					return;
				}

				const isVisible = !!values[configIdx];

				updatedConfigs[configIdx].visible = isVisible;

				const subColumns = updatedConfigs[configIdx].subColumns;

				if (subColumns?.length) {
					subColumns.forEach((subColId) => {
						const subConfigIdx = updatedConfigs.findIndex(
							(subColumn: TableColumnConfig) =>
								subColumn.id === subColId,
						);

						if (subConfigIdx >= 0) {
							updatedConfigs[subConfigIdx].visible = isVisible;
						}
					});
				}
			});

			return updatedConfigs;
		});
	}

	public createDragGhostExample(
		originalRow: HTMLElement,
		rect: DOMRect,
	): HTMLElement {
		const table = document.createElement('table');
		const tbody = document.createElement('tbody');
		const clonedRow = originalRow.cloneNode(true) as HTMLElement;

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

		tbody.appendChild(clonedRow);
		table.appendChild(tbody);

		return table;
	}
}
