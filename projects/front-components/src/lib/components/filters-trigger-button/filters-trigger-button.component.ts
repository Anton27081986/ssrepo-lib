import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent } from '../buttons';
import { DropdownItemComponent, DropdownListComponent } from '../dropdown';
import { PopoverTriggerForDirective } from '../../core/directives';
import {
	ButtonType,
	IconPosition,
	IconType,
	IFilterItem,
} from '../../shared/models';
import { HeaderFilterService } from '../../shared/services';
import { NgFor } from '@angular/common';

@Component({
	selector: 'app-filters-trigger-button',
	standalone: true,
	imports: [
		ButtonComponent,
		DropdownListComponent,
		DropdownItemComponent,
		PopoverTriggerForDirective,
		NgFor,
	],
	templateUrl: './filters-trigger-button.component.html',
	styleUrl: './filters-trigger-button.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersTriggerButtonComponent {
	protected readonly filterService: HeaderFilterService =
		inject(HeaderFilterService);

	protected filters: IFilterItem[] = this.filterService.filterItems;

	protected readonly IconType = IconType;
	protected readonly IconPosition = IconPosition;
	protected readonly ButtonType = ButtonType;

	protected addFilterMenu(filter: IFilterItem): void {
		if (!filter.active) {
			filter.active = true;
			this.filterService.addFilterMenu(filter);
		}
	}
}
