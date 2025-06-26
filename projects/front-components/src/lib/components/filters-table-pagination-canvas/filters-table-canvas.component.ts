import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	type InputSignal,
	type TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { FilterMenuComponent } from '../filter-menu/filter-menu.component';
import { HeaderFilterService } from '../../shared/services';

@Component({
	selector: 'ss-lib-table-filters-canvas',
	templateUrl: 'filters-table-canvas.component.html',
	styleUrls: ['filters-table-canvas.component.scss'],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgTemplateOutlet, FilterMenuComponent],
})
export class FiltersTableCanvasComponent {
	public readonly leftFiltersRef: InputSignal<TemplateRef<{}> | null> =
		input.required();

	public readonly rightFiltersRef: InputSignal<TemplateRef<{}> | null> =
		input.required();

	public readonly tableRef: InputSignal<TemplateRef<{}> | null> =
		input.required();

	public readonly paginationRef: InputSignal<TemplateRef<{}> | null> =
		input.required();

	public readonly filterService: HeaderFilterService =
		inject(HeaderFilterService);
}
