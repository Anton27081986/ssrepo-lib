import { Component, input } from '@angular/core';
import { SkeletonTableComponent } from '../../../lib/components/skeleton/skeleton-table/skeleton-table.component';
import { Shape } from '../../../lib/shared/models';
import { ColumnsStateService } from '../../../lib/components/table/columns.state.service';

@Component({
	selector: 'ss-lib-skeleton-table-wrapper',
	standalone: true,
	imports: [SkeletonTableComponent],
	providers: [ColumnsStateService],
	template: `
		<div style="padding: 20px; background: #f3f4f6; border-radius: 8px;">
			<ss-lib-skeleton-table
				[countItems]="countItems()"
			></ss-lib-skeleton-table>
		</div>
	`,
})
export class SkeletonTableWrapperComponent {
	countItems = input<number>(7);
}
