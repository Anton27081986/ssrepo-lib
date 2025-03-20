import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '../../../lib/components/select/select.component';
import { DropdownListComponent } from '../../../lib/components/dropdown-list/dropdown-list.component';

@Component({
	selector: 'ss-lib-select-wrapper',
	standalone: true,
	imports: [SelectComponent, DropdownListComponent, ReactiveFormsModule],
	template: `
		<ss-lib-select
			[formControl]="control"
			[placeholder]="placeholder()"
		>
			<ss-lib-dropdown-list>
				<ss-lib-dropdown-item
					*ngFor="let item of items"
					[value]="item"
				>
					{{ item.label }}
				</ss-lib-dropdown-item>
			</ss-lib-dropdown-list>
		</ss-lib-select>
	`,
})
export class SelectWrapperComponent {
	control = new FormControl<string | null>(null);
	placeholder = input<string>('Выберите из списка');

	items = [
		{ id: '1', label: 'Опция 1' },
		{ id: '2', label: 'Опция 2' },
		{ id: '3', label: 'Опция 3' },
	];
}
