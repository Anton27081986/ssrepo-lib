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

	public readonly visibleColumnsIds = computed<readonly string[]>(() =>
		this.state()
			.columnConfigs.filter((col) => col.visible && col.showInHeader)
			.map((col) => col.id),
	);

	public readonly visibleColumns = computed<readonly TableColumnConfig[]>(
		() => this.state().columnConfigs.filter((col) => col.showInHeader),
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
	 * Replaces the entire columnConfigs in the state and updates related form controls.
	 * @param newConfigs The new column configurations.
	 */
	public replaceColumnConfigs(newConfigs: TableColumnConfig[]): void {
		this.state.update((currentState) => ({
			...currentState,
			columnConfigs: [...newConfigs],
		}));
		this.reinitializeColumnsForm(newConfigs);
	}

	/**
	 * Initializes the table with data and column configurations.
	 * @param data The table data.
	 * @param configs The column configurations.
	 */
	public initialize(data: T[], configs: TableColumnConfig[]): void {
		this.state.set({ data, columnConfigs: [...configs] });
		this.reinitializeColumnsForm(configs);
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
		const allConfigs = this.state().columnConfigs;

		this.state.update((currentState) => {
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
	 * Updates the visibility of a column and its sub-columns/subGroups.
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

			// Move hidden columns to the end
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

			return { ...currentState, columnConfigs: [...updatedConfigs] };
		});
	}

	/**
	 * Handles changes to the master checkbox.
	 * @param value The new checkbox value.
	 */
	public onMasterCheckboxChange(value: boolean | null): void {
		const checkboxValue =
			this.checkboxControls.masterCheckboxIndeterminate() ? false : value;

		if (this.checkboxControls.masterCheckboxIndeterminate()) {
			this.checkboxControls.masterCheckboxIndeterminate.set(false);
		}

		this.checkboxControls.masterCheckbox.setValue(checkboxValue!, {
			emitEvent: false,
		});

		this.checkboxControls.rowCheckboxes.controls.forEach(
			(control: FormControl) => {
				control.setValue(checkboxValue, { emitEvent: false });
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

	private reinitializeColumnsForm(configs: TableColumnConfig[]): void {
		configs.forEach((config) => {
			this.columnsForm.addControl(
				config.id,
				new FormControl<boolean>(config.visible ?? true, {
					nonNullable: true,
				}),
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

	private handleDragWithinList(
		data: TableColumnConfig[],
		event: CdkDragDrop<TableColumnConfig[]>,
	): void {
		moveItemInArray(data, event.previousIndex, event.currentIndex);
	}

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
			if (!col?.stickyColumn) {
				const config = allConfigs.find((c) => c.id === col.id);

				if (config) {
					config.visible = isVisibleContainer;
					const control = this.columnsForm.get(col.id);

					control?.setValue(isVisibleContainer);
				}
			}
		});
	}

	private collectWithSubColumns(
		parent: TableColumnConfig,
		allConfigs: TableColumnConfig[],
	): TableColumnConfig[] {
		const result: TableColumnConfig[] = [parent];

		if (parent.subColumns) {
			const subColumns = parent.subColumns
				.map((subId) => allConfigs.find((col) => col.id === subId))
				.filter((col): col is TableColumnConfig => !!col);

			result.push(...subColumns);
		}

		if (parent.subGroups) {
			const subGroupColumns = parent.subGroups
				.map((subGroupId) => {
					const subGroupColumn = allConfigs.find(
						(col) => col.id === subGroupId,
					);

					if (subGroupColumn) {
						return this.collectWithSubColumns(
							subGroupColumn,
							allConfigs,
						);
					}

					return [];
				})
				.flat()
				.filter((col): col is TableColumnConfig => !!col);

			result.push(...subGroupColumns);
		}

		return result;
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

		// Сохраняем исходный порядок sticky колонок
		const stickyColumns = allConfigs.filter((item) => item.stickyColumn);

		result.push(...stickyColumns);

		// Добавляем видимые dropdown колонки с их подколонками/подгруппами
		newConfigs
			.filter(
				(item) =>
					item.showInDropdown && item.visible && !item.stickyColumn,
			)
			.forEach((item) =>
				result.push(...this.collectWithSubColumns(item, allConfigs)),
			);

		// Добавляем скрытые dropdown колонки с их подколонками/подгруппами
		newConfigs
			.filter(
				(item) =>
					item.showInDropdown && !item.visible && !item.stickyColumn,
			)
			.forEach((item) =>
				result.push(...this.collectWithSubColumns(item, allConfigs)),
			);

		return result;
	}

	private setColumnVisibility(
		column: TableColumnConfig,
		allConfigs: TableColumnConfig[],
		isVisible: boolean,
	): void {
		column.visible = isVisible;

		if (column.subGroups) {
			column.subGroups.forEach((subId) => {
				const subGroup = allConfigs.find((col) => col.id === subId);

				if (subGroup) {
					this.setColumnVisibility(subGroup, allConfigs, isVisible);
				}
			});
		}

		if (column.subColumns) {
			column.subColumns.forEach((subId) => {
				const subColumn = allConfigs.find((col) => col.id === subId);

				if (subColumn) {
					subColumn.visible = isVisible;
				}
			});
		}
	}
}
