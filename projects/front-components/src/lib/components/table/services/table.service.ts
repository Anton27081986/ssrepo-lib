import { Injectable } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { TableColumnConfig } from '../models/table-column-config';

@Injectable({
	providedIn: 'root',
})
export class TableService {
	// private updateColumnVisibility(values: Array<boolean | null>): void {
	// 	const dropdownColumns = this.dropdownColumns();
	//
	// 	this.columnConfigs.update((configs) => {
	// 		const updatedConfigs = [...configs];
	//
	// 		dropdownColumns.forEach((dropdownItem) => {
	// 			const configIdx = updatedConfigs.findIndex(
	// 				(col: TableColumnConfig) => col.id === dropdownItem.id,
	// 			);
	//
	// 			if (configIdx === -1) {
	// 				return;
	// 			}
	//
	// 			const isVisible = !!values[configIdx];
	//
	// 			updatedConfigs[configIdx].visible = isVisible;
	//
	// 			updatedConfigs[configIdx].subColumns?.forEach(
	// 				(subId: string): void => {
	// 					const subConfigIdx = updatedConfigs.findIndex(
	// 						(col) => col.id === subId,
	// 					);
	//
	// 					if (subConfigIdx !== -1) {
	// 						updatedConfigs[subConfigIdx].visible = isVisible;
	// 					}
	// 				},
	// 			);
	// 		});
	//
	// 		return updatedConfigs;
	// 	});
	// }
	//
	// public onDragDropInDropdown(
	// 	event: CdkDragDrop<TableColumnConfig>,
	// 	dropdownColumns: TableColumnConfig[],
	// 	columnConfigs: TableColumnConfig[],
	// ): TableColumnConfig[] {
	// 	const dropdownCols = dropdownColumns;
	// 	const allConfigs = [...columnConfigs];
	// 	const draggedColumn = dropdownCols[event.previousIndex];
	//
	// 	const draggedGroup = this.collectWithSubColumns(
	// 		draggedColumn,
	// 		allConfigs,
	// 	);
	// 	const updatedConfigs = this.removeColumns(allConfigs, draggedGroup);
	// 	const targetIndex = this.findTargetIndex(
	// 		event,
	// 		dropdownCols,
	// 		allConfigs,
	// 	);
	//
	// 	updatedConfigs.splice(targetIndex, 0, ...draggedGroup);
	//
	// 	return updatedConfigs;
	// }
	//
	// private collectWithSubColumns(
	// 	parent: TableColumnConfig,
	// 	allConfigs: TableColumnConfig[],
	// ): TableColumnConfig[] {
	// 	return [
	// 		parent,
	// 		...(parent.subColumns
	// 			?.map((subId: string) =>
	// 				allConfigs.find(
	// 					(col: TableColumnConfig) => col.id === subId,
	// 				),
	// 			)
	// 			.filter(
	// 				(col: unknown): col is TableColumnConfig =>
	// 					col !== undefined,
	// 			) || []),
	// 	];
	// }
	//
	// private removeColumns(
	// 	source: TableColumnConfig[],
	// 	toRemove: TableColumnConfig[],
	// ): TableColumnConfig[] {
	// 	const removeIds = new Set(
	// 		toRemove.map((col: TableColumnConfig) => col.id),
	// 	);
	//
	// 	return source.filter(
	// 		(col: TableColumnConfig) => !removeIds.has(col.id),
	// 	);
	// }
	//
	// private findTargetIndex(
	// 	event: CdkDragDrop<TableColumnConfig>,
	// 	dropdownCols: TableColumnConfig[],
	// 	allConfigs: TableColumnConfig[],
	// ): number {
	// 	const { previousIndex, currentIndex } = event;
	// 	const draggedColumn = dropdownCols[previousIndex];
	// 	const isDraggingGroup = !!draggedColumn.subColumns?.length;
	//
	// 	const getSubColumnCount = (column: TableColumnConfig): number =>
	// 		column.subColumns?.length ?? 0;
	//
	// 	// Case 1: Drop at the start of dropdown
	// 	if (currentIndex === 0) {
	// 		return allConfigs.findIndex((col) => col.showInDropdown) ?? 0;
	// 	}
	//
	// 	// Case 2: Drop at or beyond the end of dropdown
	// 	if (currentIndex >= dropdownCols.length - 1) {
	// 		const lastVisibleIndex =
	// 			allConfigs
	// 				.map((col, idx) => (col.showInDropdown ? idx : -1))
	// 				.filter((idx) => idx !== -1)
	// 				.pop() ?? allConfigs.length;
	//
	// 		if (lastVisibleIndex === allConfigs.length) {
	// 			return lastVisibleIndex;
	// 		}
	//
	// 		const lastVisibleColumn = allConfigs[lastVisibleIndex];
	// 		let targetIndex = lastVisibleIndex + 1;
	//
	// 		targetIndex +=
	// 			getSubColumnCount(lastVisibleColumn) *
	// 			(isDraggingGroup ? 0 : 1);
	// 		targetIndex -=
	// 			getSubColumnCount(draggedColumn) * (isDraggingGroup ? 1 : 0);
	//
	// 		return targetIndex;
	// 	}
	//
	// 	// Case 3: Drop in the middle
	// 	const targetColumn = dropdownCols[currentIndex];
	// 	let targetIndex =
	// 		allConfigs.findIndex((col) => col.id === targetColumn.id) ?? -1;
	//
	// 	if (currentIndex > previousIndex) {
	// 		targetIndex +=
	// 			getSubColumnCount(targetColumn) * (isDraggingGroup ? 0 : 1);
	// 		targetIndex -=
	// 			getSubColumnCount(draggedColumn) * (isDraggingGroup ? 1 : 0);
	// 	}
	//
	// 	return targetIndex;
	// }
}
