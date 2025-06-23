import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import {
	CdkDragDrop,
	moveItemInArray,
	transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ColumnControls, TableColumnConfig } from '../models';

interface TableState<T> {
	data: T[];
	columnConfigs: TableColumnConfig[];
}

interface CheckboxControls {
	masterCheckbox: FormControl<boolean>;
	masterCheckboxIndeterminate: WritableSignal<boolean>;
	rowCheckboxes: FormArray<FormControl<boolean>>;
}

@Injectable()
export class SsTableState<T> {
	private readonly state = signal<TableState<T>>({
		data: [],
		columnConfigs: [],
	});

	private readonly columnsForm = new FormGroup<ColumnControls>({});
	private readonly checkboxControls: CheckboxControls = {
		masterCheckbox: new FormControl<boolean>(false, { nonNullable: true }),
		masterCheckboxIndeterminate: signal<boolean>(false),
		rowCheckboxes: new FormArray<FormControl<boolean>>([]),
	};

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
	 * @param visibleColumns The list of visible columns.
	 * @param hiddenColumns The list of hidden columns.
	 */
	public onDropdownItemDrop(
		event: CdkDragDrop<TableColumnConfig[]>,
		visibleColumns: TableColumnConfig[],
		hiddenColumns: TableColumnConfig[],
	): void {
		this.state.update((currentState) => {
			const allConfigs = [...currentState.columnConfigs];
			const isVisibleContainer = event.container.data === visibleColumns;

			if (event.previousContainer === event.container) {
				this.handleDragWithinList(
					isVisibleContainer ? visibleColumns : hiddenColumns,
					event,
				);
			} else {
				this.handleDragBetweenLists(
					event,
					isVisibleContainer,
					allConfigs,
				);
			}

			const updatedDropdownColumns = [
				...visibleColumns,
				...hiddenColumns,
			];
			const newConfigs = this.reorderColumnsWithSubColumns(
				updatedDropdownColumns,
				allConfigs,
			);

			return { ...currentState, columnConfigs: newConfigs };
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
			const targetColumn = updatedConfigs.find(
				(col) => col.id === column.id,
			);

			if (!targetColumn) {
				return currentState;
			}

			this.setColumnVisibility(targetColumn, updatedConfigs, isVisible);

			if (!isVisible) {
				const visibilityGroup = this.collectWithSubColumns(
					targetColumn,
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

	/**
	 * Handles drag-and-drop within the same list.
	 * @param data The list data.
	 * @param event The drag-and-drop event.
	 */
	private handleDragWithinList(
		data: TableColumnConfig[],
		event: CdkDragDrop<TableColumnConfig[]>,
	): void {
		moveItemInArray(data, event.previousIndex, event.currentIndex);
	}

	/**
	 * Handles drag-and-drop between lists.
	 * @param event The drag-and-drop event.
	 * @param isVisibleContainer Whether the target container is for visible columns.
	 * @param allConfigs All column configurations.
	 */
	private handleDragBetweenLists(
		event: CdkDragDrop<TableColumnConfig[]>,
		isVisibleContainer: boolean,
		allConfigs: TableColumnConfig[],
	): void {
		transferArrayItem(
			event.previousContainer.data,
			event.container.data,
			event.previousIndex,
			event.currentIndex,
		);

		const draggedColumn = event.container.data[event.currentIndex];
		const draggedGroup = this.collectWithSubColumns(
			draggedColumn,
			allConfigs,
		);

		draggedGroup.forEach((col) => {
			const config = allConfigs.find((c) => c.id === col.id);

			if (config) {
				config.visible = isVisibleContainer;
				const control = this.columnsForm.get(col.id);

				control?.setValue(isVisibleContainer);
			}
		});
	}

	/**
	 * Collects a column and its sub-columns.
	 * @param parent The parent column.
	 * @param allConfigs All column configurations.
	 * @returns An array of the parent column and its sub-columns.
	 */
	private collectWithSubColumns(
		parent: TableColumnConfig,
		allConfigs: TableColumnConfig[],
	): TableColumnConfig[] {
		return [
			parent,
			...(parent.subColumns
				?.map((subId) => allConfigs.find((col) => col.id === subId))
				.filter((col): col is TableColumnConfig => !!col) ?? []),
		];
	}

	/**
	 * Removes specified columns from a source array.
	 * @param source The source array of columns.
	 * @param toRemove The columns to remove.
	 * @returns The filtered array.
	 */
	private removeColumns(
		source: TableColumnConfig[],
		toRemove: TableColumnConfig[],
	): TableColumnConfig[] {
		const removeIds = new Set(toRemove.map((col) => col.id));

		return source.filter((col) => !removeIds.has(col.id));
	}

	/**
	 * Reorders columns, preserving sub-columns and visibility.
	 * @param newConfigs The new column configurations.
	 * @param allConfigs All column configurations.
	 * @returns The reordered column configurations.
	 */
	private reorderColumnsWithSubColumns(
		newConfigs: TableColumnConfig[],
		allConfigs: TableColumnConfig[],
	): TableColumnConfig[] {
		const result: TableColumnConfig[] = [];

		// Add non-dropdown columns first
		result.push(...newConfigs.filter((item) => !item.showInDropdown));

		// Add visible dropdown columns with their sub-columns
		newConfigs
			.filter((item) => item.showInDropdown && item.visible)
			.forEach((item) =>
				result.push(...this.collectWithSubColumns(item, allConfigs)),
			);

		// Add hidden dropdown columns with their sub-columns
		newConfigs
			.filter((item) => item.showInDropdown && !item.visible)
			.forEach((item) =>
				result.push(...this.collectWithSubColumns(item, allConfigs)),
			);

		return result;
	}

	/**
	 * Sets visibility for a column and its sub-columns.
	 * @param column The column to update.
	 * @param allConfigs All column configurations.
	 * @param isVisible The visibility state.
	 */
	private setColumnVisibility(
		column: TableColumnConfig,
		allConfigs: TableColumnConfig[],
		isVisible: boolean,
	): void {
		column.visible = isVisible;
		column.subColumns?.forEach((subId) => {
			const subColumn = allConfigs.find((col) => col.id === subId);

			if (subColumn) {
				subColumn.visible = isVisible;
			}
		});
	}
}
