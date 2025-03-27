import { Component, input } from '@angular/core';
import { DropdownListComponent } from '../../../lib/components/dropdown-list/dropdown-list.component';
import { DropdownItemComponent } from '../../../lib/components/dropdown-item/dropdown-item.component';

@Component({
	selector: 'ss-lib-dropdown-list-wrapper',
	standalone: true,
	imports: [DropdownListComponent, DropdownItemComponent],
	template: `
		<ss-lib-dropdown-list
			[width]="width()"
			[height]="height()"
			(value)="onValue($event)"
			(closed)="onClosed()"
		>
			<ng-template #dropdownTemplate>
				<ss-lib-dropdown-item
					*ngFor="let item of items"
					[value]="item"
				>
					{{ item.label }}
				</ss-lib-dropdown-item>
			</ng-template>
		</ss-lib-dropdown-list>
	`,
})
export class DropdownListWrapperComponent {
	width = input<string>('max-content');
	height = input<string>('auto');

	items = [
		{ id: '1', label: 'Опция 1' },
		{ id: '2', label: 'Опция 2' },
		{ id: '3', label: 'Опция 3' },
	];

	onValue(value: any): void {
		console.log('Selected value:', value);
	}

	onClosed(): void {
		console.log('Dropdown closed');
	}
}
