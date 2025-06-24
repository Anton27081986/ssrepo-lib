import {
	ChangeDetectionStrategy,
	Component,
	contentChildren,
	output,
} from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { NgTemplateOutlet } from '@angular/common';
import { TableColumnConfig } from '../../table/models';
import { DropdownItemComponent } from '../dropdown-item/dropdown-item.component';

@Component({
	selector: 'ss-lib-dropdown-draggable-group-list',
	imports: [CdkDropList, CdkDrag, NgTemplateOutlet, DropdownItemComponent],
	templateUrl: './dropdown-draggable-group-list.component.html',
	styleUrl: './dropdown-draggable-group-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownDraggableGroupListComponent {
	public readonly items = contentChildren(DropdownItemComponent);
	public readonly dropItem = output<CdkDragDrop<TableColumnConfig>>();

	public onDropItem(event: CdkDragDrop<TableColumnConfig>): void {
		this.dropItem.emit(event);
	}
}
