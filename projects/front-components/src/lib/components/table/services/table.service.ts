import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ColumnControls, TableColumnConfig } from '../models';
import { CheckboxType } from '../../../shared/models/types/check-box-type';

@Injectable()
export class SsTableState<T> {
	// State
	private readonly tableData = signal<T[]>([]);
	private readonly columnConfigs = signal<TableColumnConfig[]>([]);
	private readonly rowCheckboxes = new FormArray<FormControl<boolean>>([]);
	private readonly columnsForm = new FormGroup<ColumnControls>({});

	private readonly masterCheckboxType = signal<CheckboxType>('default');
	private readonly masterCheckboxCtrl = new FormControl<boolean>(false, {
		nonNullable: true,
	});

	// Computed signals
	public readonly dropdownColumns = computed(() =>
		this.columnConfigs().filter((col) => col.showInDropdown),
	);

	public readonly visibleColumns = computed<readonly string[]>(() =>
		this.columnConfigs()
			.filter((col) => col.visible)
			.map((col) => col.id),
	);

	public readonly data = computed(() => this.tableData());
	public readonly showLeftBorder = computed(() => {
		const findFirstColumn = this.columnConfigs().find((col) => col.visible);

		return !!findFirstColumn && !!findFirstColumn.subColumns?.length;
	});

	public getMasterCheckboxCtrl(): FormControl<boolean> {
		return this.masterCheckboxCtrl;
	}

	public getRowCheckboxes(): FormArray<FormControl<boolean>> {
		return this.rowCheckboxes;
	}

	public getColumnsForm(): FormGroup<ColumnControls> {
		return this.columnsForm;
	}

	public getMasterCheckboxType(): WritableSignal<CheckboxType> {
		return this.masterCheckboxType;
	}

	public initialize(data: T[], configs: TableColumnConfig[]): void {
		this.tableData.set(data);
		this.columnConfigs.set(configs);

		configs.forEach((config) => {
			this.columnsForm.addControl(
				config.id,
				new FormControl<boolean>(true, { nonNullable: true }),
			);
		});

		this.rowCheckboxes.clear();
		data.forEach(() => {
			this.rowCheckboxes.push(
				new FormControl<boolean>(false, { nonNullable: true }),
			);
		});
	}

	public getRowCheckboxControl(index: number): FormControl {
		return this.rowCheckboxes.at(index) as FormControl;
	}

	public getControlForColumn(column: TableColumnConfig): FormControl {
		return this.columnsForm.get(column.id) as FormControl;
	}

	public onDropdownItemDrop(event: CdkDragDrop<TableColumnConfig[]>): void {
		const allConfigs = [...this.columnConfigs()];
		const draggedColumn = event.previousContainer.data[event.previousIndex];

		const draggedGroup = this.collectWithSubColumns(
			draggedColumn,
			allConfigs,
		);

		const updatedConfigs = this.removeColumns(allConfigs, draggedGroup);

		if (event.previousContainer !== event.container) {
			const isVisible = !draggedColumn.visible;

			draggedGroup.forEach((column) => {
				column.visible = isVisible;
				this.columnsForm.get(column.id)?.setValue(isVisible);
			});
		}

		const targetIndex = this.findTargetIndex(
			event,
			draggedColumn,
			allConfigs,
		);

		updatedConfigs.splice(targetIndex, 0, ...draggedGroup);
		this.columnConfigs.set(updatedConfigs);
	}

	public updateColumnVisibility(
		column: TableColumnConfig,
		isVisible: boolean,
	): void {
		this.columnConfigs.update(
			(configs: TableColumnConfig[]): TableColumnConfig[] => {
				let updatedConfigs = [...configs];

				const updatedColumn = updatedConfigs.find(
					(col: TableColumnConfig) => col.id === column.id,
				);

				if (!updatedColumn) {
					return updatedConfigs;
				}

				updatedColumn.visible = isVisible;

				updatedColumn.subColumns?.forEach((subId: string) => {
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

					updatedConfigs.splice(
						updatedConfigs.length,
						0,
						...visibilityGroup,
					);
				}

				return updatedConfigs;
			},
		);
	}

	public onMasterCheckboxChange(value: boolean | null): void {
		if (this.masterCheckboxType() === 'indeterminate') {
			this.masterCheckboxType.set('default');
		}

		this.rowCheckboxes.controls.forEach((control: FormControl) => {
			control.setValue(value, { emitEvent: false });
		});
	}

	public updateMasterCheckboxState(): void {
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
		this.masterCheckboxType.set(
			isIndeterminate ? 'indeterminate' : 'default',
		);
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
		event: CdkDragDrop<TableColumnConfig[]>,
		draggedColumn: TableColumnConfig,
		allConfigs: TableColumnConfig[],
	): number {
		const { previousIndex, currentIndex } = event;
		const isDraggingGroup = !!draggedColumn.subColumns?.length;

		const getSubColumnCount = (column: TableColumnConfig): number =>
			column.subColumns?.length ?? 0;

		if (currentIndex === 0) {
			return allConfigs.findIndex((col) => col.showInDropdown) ?? 0;
		}

		if (currentIndex >= event.container.data.length - 1) {
			const lastVisibleIndex =
				allConfigs
					.map((col, idx) => (col.showInDropdown ? idx : -1))
					.filter((idx) => idx !== -1)
					.pop() ?? allConfigs.length;

			if (lastVisibleIndex === allConfigs.length) {
				return lastVisibleIndex;
			}

			const lastVisibleColumn = allConfigs[lastVisibleIndex];
			let targetIndex = lastVisibleIndex + 1;

			targetIndex +=
				getSubColumnCount(lastVisibleColumn) *
				(isDraggingGroup ? 0 : 1);

			return targetIndex;
		}

		const targetColumn = event.container.data[currentIndex];
		const isTargetGroup = !!targetColumn.subColumns?.length;

		let targetIndex =
			allConfigs.findIndex((col) => col.id === targetColumn.id) ?? -1;

		if (
			event.container === event.previousContainer &&
			currentIndex > previousIndex
		) {
			if (isDraggingGroup && !isTargetGroup) {
				targetIndex -= getSubColumnCount(draggedColumn);
			}

			if (!isDraggingGroup) {
				targetIndex += getSubColumnCount(targetColumn);
			}
		}

		return targetIndex;
	}
}
