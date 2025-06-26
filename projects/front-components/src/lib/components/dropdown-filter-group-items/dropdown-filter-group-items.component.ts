import {
	ChangeDetectionStrategy,
	Component,
	input,
	InputSignal,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { TextComponent } from '../text/text.component';
import { rotateAnimation } from '../../core/animations';
import {
	Colors,
	ExtraSize,
	IconType,
	TextType,
	TextWeight,
	TreeNodeFilter,
} from '../../shared/models';

@Component({
	selector: 'ss-lib-dropdown-group-filter-items',
	standalone: true,
	imports: [
		IconComponent,
		CheckboxComponent,
		TextComponent,
		ReactiveFormsModule,
		NgIf,
	],
	templateUrl: './dropdown-filter-group-items.component.html',
	styleUrl: './dropdown-filter-group-items.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [rotateAnimation],
})
export class DropdownFilterGroupItemsComponent {
	public treeNode: InputSignal<TreeNodeFilter> = input.required();
	protected readonly Colors = Colors;
	protected readonly ExtraSize = ExtraSize;
	protected readonly TextType = TextType;
	protected readonly TextWeight = TextWeight;
	protected readonly IconType = IconType;

	public expand(): void {
		this.treeNode().expanded = !this.treeNode().expanded;
	}

	public checkItems(controlCheckAll: FormControl<boolean | null>): void {
		controlCheckAll.setValue(!controlCheckAll.value);
	}
}
