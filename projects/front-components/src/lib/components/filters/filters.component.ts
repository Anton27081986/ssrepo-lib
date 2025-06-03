import { Component, inject, Signal } from '@angular/core';
import { NgComponentOutlet, NgForOf, NgIf } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { ButtonComponent } from '../buttons';
import { DividerComponent } from '../divider/divider.component';
import { DropdownItemComponent } from '../dropdown-item/dropdown-item.component';
import { DropdownListComponent } from '../dropdown-list/dropdown-list.component';
import { PopoverTriggerForDirective } from '../../core/directives';
import { IFilter } from '../../../../../test-app/src/app/stand/stand.component';
import {
	ButtonType,
	ExtraSize,
	IconPosition,
	IconType,
} from '../../shared/models';
import { FilterService } from '../../shared/services';

@Component({
	selector: 'ss-lib-filters',
	standalone: true,
	imports: [
		ButtonComponent,
		DividerComponent,
		DropdownItemComponent,
		DropdownListComponent,
		NgForOf,
		PopoverTriggerForDirective,
		NgIf,
		NgComponentOutlet,
	],
	templateUrl: './filters.component.html',
	styleUrl: './filters.component.scss',
})
export class FiltersComponent {
	private readonly service: FilterService = inject(FilterService);
	public controlQuery: FormControl<null | string> = new FormControl('');

	public readonly filters: Signal<IFilter[]> = toSignal(
		this.service.filters$,
		{ initialValue: [] },
	);

	public readonly activeFilters: Signal<IFilter[]> = toSignal(
		this.service.activeFilters$,
		{ initialValue: [] },
	);

	protected readonly ButtonType = ButtonType;
	protected readonly IconType = IconType;

	protected readonly IconPosition = IconPosition;
	protected readonly ExtraSize = ExtraSize;

	protected selectedFilter(filter: IFilter): void {
		this.service.selectedFilter(filter);
	}

	// protected getControl(filter: IFilter): AbstractControl {
	// 	return this.service.formGroupFilter.get(filter.name);
	// }

	protected clearAllFilter(): void {
		this.service.clearAllFilter();
	}
}
