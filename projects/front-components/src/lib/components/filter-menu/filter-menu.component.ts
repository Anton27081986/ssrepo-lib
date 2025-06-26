import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FilterMenuItemComponent } from '../filter-menu-item/filter-menu-item.component';
import { ButtonComponent } from '../buttons';
import { rotateAnimation } from '../../core/animations';
import { HeaderFilterService } from '../../shared/services';
import { ButtonType, IconPosition, IconType } from '../../shared/models';

@Component({
	selector: 'ss-lib-filter-menu',
	standalone: true,
	imports: [FilterMenuItemComponent, NgFor, ButtonComponent, NgIf],
	templateUrl: './filter-menu.component.html',
	styleUrl: './filter-menu.component.scss',
	animations: [rotateAnimation],
})
export class FilterMenuComponent {
	protected filterService: HeaderFilterService = inject(HeaderFilterService);

	protected readonly ButtonType = ButtonType;
	protected readonly IconPosition = IconPosition;
	protected readonly IconType = IconType;

	protected get checkActiveFilter(): boolean {
		return this.filterService.menuFilterItems.length > 0;
	}

	protected clearAll(): void {
		this.filterService.removeFilterAllMenu();
	}
}
