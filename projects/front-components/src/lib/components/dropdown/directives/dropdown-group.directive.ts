import { contentChildren, Directive, input } from '@angular/core';
import { DropdownItemComponent } from '../dropdown-item/dropdown-item.component';

@Directive({
	standalone: true,
	selector: 'ss-lib-dropdown-group',
	host: {
		role: 'group',
		'[attr.data-label]': 'label()',
	},
})
export class DropdownGroupDirective {
	public readonly label = input<string | null>(null);

	public readonly items = contentChildren(DropdownItemComponent);
}
