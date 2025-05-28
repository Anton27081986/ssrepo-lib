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
import { CheckboxType } from '../../../../front-components/src/lib/shared/models/types/check-box-type';
import { TableColumnConfig } from '../../../../front-components/src/lib/components/table/models/table-column-config';

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
	public readonly masterCheckboxCtrl = new FormControl<boolean>(false, {
		nonNullable: true,
	});

	public readonly rowCheckboxes = new FormArray<FormControl<boolean>>([]);
	public readonly columnsForm = new FormArray<FormControl<boolean>>(
		this.columnConfigs().map(
			() => new FormControl<boolean>(true, { nonNullable: true }),
		),
	);

	public masterCheckboxType = signal<CheckboxType>('default');

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
			this.masterCheckboxCtrl.valueChanges.pipe(
				tap((value: boolean | null) =>
					this.onMasterCheckboxChange(value),
				),
			),
		);

		toSignal(
			this.rowCheckboxes.valueChanges.pipe(
				tap(() => {
					this.updateMasterCheckboxState();
				}),
			),
		);
	}

	public ngOnInit(): void {
		this.initializeCheckboxes();
	}

	public getRowCheckboxControl(index: number): FormControl {
		return this.rowCheckboxes.at(index) as FormControl;
	}

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

	private initializeCheckboxes(): void {
		this.tableData.forEach(() => {
			this.rowCheckboxes.push(
				new FormControl<boolean>(false, { nonNullable: true }),
			);
		});
	}

	private onMasterCheckboxChange(value: boolean | null): void {
		if (this.masterCheckboxType() === 'indeterminate') {
			this.masterCheckboxType.set('default');
		}

		this.rowCheckboxes.controls.forEach((control: FormControl): void => {
			control.setValue(value, { emitEvent: false });
		});
	}

	private updateMasterCheckboxState(): void {
		const checkedCount = this.rowCheckboxes.controls.filter(
			(control) => control.value,
		).length;

		const totalCount = this.rowCheckboxes.controls.length;

		const isAllChecked = checkedCount === totalCount && totalCount > 0;
		const isNoneChecked = checkedCount === 0;
		const isIndeterminate = !isAllChecked && !isNoneChecked;

		this.masterCheckboxCtrl.setValue(isAllChecked || isIndeterminate, {
			emitEvent: false,
		});

		isIndeterminate
			? this.masterCheckboxType.set('indeterminate')
			: this.masterCheckboxType.set('default');
	}

	private collectWithSubColumns(
		parent: TableColumnConfig,
		allConfigs: TableColumnConfig[],
	): TableColumnConfig[] {
		return [
			parent,
			...(parent.subColumns
				?.map((subId: string) =>
					allConfigs.find(
						(col: TableColumnConfig) => col.id === subId,
					),
				)
				.filter(
					(col: unknown): col is TableColumnConfig =>
						col !== undefined,
				) || []),
		];
	}

	private removeColumns(
		source: TableColumnConfig[],
		toRemove: TableColumnConfig[],
	): TableColumnConfig[] {
		const removeIds = new Set(
			toRemove.map((col: TableColumnConfig) => col.id),
		);

		return source.filter(
			(col: TableColumnConfig) => !removeIds.has(col.id),
		);
	}

	private findTargetIndex(
		event: CdkDragDrop<TableColumnConfig>,
		dropdownCols: TableColumnConfig[],
		allConfigs: TableColumnConfig[],
	): number {
		// Case 1: Drop at the start of dropdown
		if (event.currentIndex === 0) {
			return allConfigs.findIndex((col) => col.showInDropdown) ?? 0;
		}

		// Case 2: Drop at or beyond the end of dropdown
		if (event.currentIndex >= dropdownCols.length - 1) {
			const lastVisibleIndex = allConfigs
				.map((col, idx) => (col.showInDropdown ? idx : -1))
				.filter((idx) => idx !== -1)
				.pop();

			return lastVisibleIndex !== undefined
				? lastVisibleIndex + 1
				: allConfigs.length;
		}

		// Case 3: Drop in the middle
		const targetColumn = dropdownCols[event.currentIndex];

		return allConfigs.findIndex((col) => col.id === targetColumn.id) ?? -1;
	}

	private updateColumnVisibility(values: Array<boolean | null>): void {
		const dropdownColumns = this.dropdownColumns();

		this.columnConfigs.update((configs) => {
			const updatedConfigs = [...configs];

			dropdownColumns.forEach((dropdownItem) => {
				const configIdx = updatedConfigs.findIndex(
					(col: TableColumnConfig) => col.id === dropdownItem.id,
				);

				if (configIdx === -1) {
					return;
				}

				const isVisible = !!values[configIdx];

				updatedConfigs[configIdx].visible = isVisible;

				updatedConfigs[configIdx].subColumns?.forEach(
					(subId: string): void => {
						const subConfigIdx = updatedConfigs.findIndex(
							(col) => col.id === subId,
						);

						if (subConfigIdx !== -1) {
							updatedConfigs[subConfigIdx].visible = isVisible;
						}
					},
				);
			});

			return updatedConfigs;
		});
	}

	public onItemDrop(itemPosition: unknown): void {
		console.info(itemPosition);
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
