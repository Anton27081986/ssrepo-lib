import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import {
	CdkDragDrop,
	moveItemInArray,
	transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ColumnControls, TableColumnConfig } from '../models';

// Interface for table state
interface TableState<T> {
	data: T[];
	columnConfigs: TableColumnConfig[];
}

// Interface for checkbox controls
interface CheckboxControls {
	masterCheckbox: FormControl<boolean>;
	masterCheckboxIndeterminate: WritableSignal<boolean>;
	rowCheckboxes: FormArray<FormControl<boolean>>;
}

/**
 * Manages the state and behavior of a table component, including data, columns, and checkboxes.
 */
@Injectable()
export class SsTableState<T> {
	// State
	private readonly state = signal<TableState<T>>({
		data: [],
		columnConfigs: [],
	});

	// Form controls
	private readonly columnsForm = new FormGroup<ColumnControls>({});
	private readonly checkboxControls: CheckboxControls = {
		masterCheckbox: new FormControl<boolean>(false, { nonNullable: true }),
		masterCheckboxIndeterminate: signal<boolean>(false),
		rowCheckboxes: new FormArray<FormControl<boolean>>([]),
	};

	// Computed properties
	public readonly dropdownColumns = computed(() =>
		this.state().columnConfigs.filter((col) => col.showInDropdown),
	);

	public readonly visibleColumns = computed<readonly string[]>(() =>
		this.state()
			.columnConfigs.filter((col) => col.visible)
			.map((col) => col.id),
	);

	public readonly data = computed(() => this.state().data);

	public readonly showLeftBorder = computed(() => {
		const firstVisibleColumn = this.state().columnConfigs.find(
			(col) => col.visible,
		);

		return !!firstVisibleColumn?.subColumns?.length;
	});

	// Getters for controls
	public getMasterCheckboxCtrl(): FormControl<boolean> {
		return this.checkboxControls.masterCheckbox;
	}

	public getRowCheckboxes(): FormArray<FormControl<boolean>> {
		return this.checkboxControls.rowCheckboxes;
	}

	public getColumnsForm(): FormGroup<ColumnControls> {
		return this.columnsForm;
	}

	public isMasterCheckboxIndeterminate(): boolean {
		return this.checkboxControls.masterCheckboxIndeterminate();
	}

	/**
	 * Initializes the table with data and column configurations.
	 * @param data The table data.
	 * @param configs The column configurations.
	 */
	public initialize(data: T[], configs: TableColumnConfig[]): void {
		this.state.set({ data, columnConfigs: configs });
		this.initializeColumnsForm(configs);
		this.initializeRowCheckboxes(data);
	}

	/**
	 * Gets the checkbox control for a specific row.
	 * @param index The row index.
	 * @returns The FormControl for the row checkbox.
	 */
	public getRowCheckboxControl(index: number): FormControl<boolean> {
		return this.checkboxControls.rowCheckboxes.at(
			index,
		) as FormControl<boolean>;
	}

	/**
	 * Gets the form control for a specific column.
	 * @param column The column configuration.
	 * @returns The FormControl for the column.
	 */
	public getControlForColumn(
		column: TableColumnConfig,
	): FormControl<boolean> {
		return this.columnsForm.get(column.id) as FormControl<boolean>;
	}

	/**
	 * Handles drag-and-drop events for columns in the dropdown.
	 * @param event The drag-and-drop event.
	 * @param visibleData
	 * @param hiddenData
	 */

	public onDropdownItemDrop(
		event: CdkDragDrop<TableColumnConfig[]>,
		visibleData: TableColumnConfig[],
		hiddenData: TableColumnConfig[],
	): void {
		this.state.update((currentState) => {
			const allConfigs = [...currentState.columnConfigs];

			const isVisibleContainer = event.container.data === visibleData;

			if (event.previousContainer === event.container) {
				// Dragging inside a single list
				const data = isVisibleContainer ? visibleData : hiddenData;

				moveItemInArray(data, event.previousIndex, event.currentIndex);
			} else {
				// Dragging between lists
				transferArrayItem(
					event.previousContainer.data,
					event.container.data,
					event.previousIndex,
					event.currentIndex,
				);

				// Updating visibility for the draggable column and its subColumns
				const draggedColumn = event.container.data[event.currentIndex];
				const isVisible = isVisibleContainer;
				const draggedGroup = this.collectWithSubColumns(
					draggedColumn,
					allConfigs,
				);

				draggedGroup.forEach((col) => {
					const config = allConfigs.find((c) => c.id === col.id);

					if (config) {
						config.visible = isVisible;
						const control = this.columnsForm.get(col.id);

						if (control) {
							control.setValue(isVisible);
						}
					}
				});
			}

			const updatedDropdownColumns = [...visibleData, ...hiddenData];

			const newConfigs = this.reorderColumnsWithSubColumns(
				updatedDropdownColumns,
				allConfigs,
			);

			return {
				...currentState,
				columnConfigs: newConfigs,
			};
		});
	}

	/**
	 * Updates the visibility of a column and its sub-columns.
	 * @param column The column to update.
	 * @param isVisible The visibility state.
	 */
	public updateColumnVisibility(
		column: TableColumnConfig,
		isVisible: boolean,
	): void {
		this.state.update((currentState) => {
			let updatedConfigs = [...currentState.columnConfigs];
			const updatedColumn = updatedConfigs.find(
				(col) => col.id === column.id,
			);

			if (!updatedColumn) {
				return currentState;
			}

			updatedColumn.visible = isVisible;
			updatedColumn.subColumns?.forEach((subId) => {
				const subColumn = updatedConfigs.find(
					(col) => col.id === subId,
				);

				if (subColumn) {
					subColumn.visible = isVisible;
				}
			});

			if (!isVisible) {
				const visibilityGroup = this.collectWithSubColumns(
					updatedColumn,
					updatedConfigs,
				);

				updatedConfigs = this.removeColumns(
					updatedConfigs,
					visibilityGroup,
				);
				updatedConfigs.push(...visibilityGroup);
			}

			return { ...currentState, columnConfigs: updatedConfigs };
		});
	}

	/**
	 * Handles changes to the master checkbox.
	 * @param value The new checkbox value.
	 */
	public onMasterCheckboxChange(value: boolean | null): void {
		if (this.checkboxControls.masterCheckboxIndeterminate()) {
			this.checkboxControls.masterCheckboxIndeterminate.set(false);
		}

		this.checkboxControls.rowCheckboxes.controls.forEach(
			(control: FormControl) => {
				control.setValue(value, { emitEvent: false });
			},
		);
	}

	/**
	 * Updates the master checkbox state based on row checkboxes.
	 */
	public updateMasterCheckboxState(): void {
		const checkedCount =
			this.checkboxControls.rowCheckboxes.controls.filter(
				(control) => control.value,
			).length;
		const totalCount = this.checkboxControls.rowCheckboxes.controls.length;

		const isAllChecked = checkedCount === totalCount && totalCount > 0;
		const isNoneChecked = checkedCount === 0;
		const isIndeterminate = !isAllChecked && !isNoneChecked;

		this.checkboxControls.masterCheckbox.setValue(isAllChecked, {
			emitEvent: false,
		});

		this.checkboxControls.masterCheckboxIndeterminate.set(isIndeterminate);
	}

	private initializeColumnsForm(configs: TableColumnConfig[]): void {
		configs.forEach((config) => {
			this.columnsForm.addControl(
				config.id,
				new FormControl<boolean>(true, { nonNullable: true }),
			);
		});
	}

	private initializeRowCheckboxes(data: T[]): void {
		this.checkboxControls.rowCheckboxes.clear();
		data.forEach(() => {
			this.checkboxControls.rowCheckboxes.push(
				new FormControl<boolean>(false, { nonNullable: true }),
			);
		});
	}

	private collectWithSubColumns(
		parent: TableColumnConfig,
		allConfigs: TableColumnConfig[],
	): TableColumnConfig[] {
		return [
			parent,
			...(parent.subColumns
				?.map((subId) => allConfigs.find((col) => col.id === subId))
				.filter((col): col is TableColumnConfig => col !== undefined) ||
				[]),
		];
	}

	private removeColumns(
		source: TableColumnConfig[],
		toRemove: TableColumnConfig[],
	): TableColumnConfig[] {
		const removeIds = new Set(toRemove.map((col) => col.id));

		return source.filter((col) => !removeIds.has(col.id));
	}

	private reorderColumnsWithSubColumns(
		newConfigs: TableColumnConfig[],
		allConfigs: TableColumnConfig[],
	): TableColumnConfig[] {
		const result: TableColumnConfig[] = [];

		result.push(...newConfigs.filter((item) => !item.showInDropdown));

		newConfigs
			.filter((item) => item.showInDropdown && item.visible)
			.forEach((item) => {
				result.push(...this.collectWithSubColumns(item, allConfigs));
			});
		newConfigs
			.filter((item) => item.showInDropdown && !item.visible)
			.forEach((item) => {
				result.push(...this.collectWithSubColumns(item, allConfigs));
			});

		return result;
	}
}
