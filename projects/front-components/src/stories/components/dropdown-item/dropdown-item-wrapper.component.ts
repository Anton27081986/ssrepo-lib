import { Component, input } from '@angular/core';
import { DropdownItemComponent } from '../../../lib/components/dropdown-item/dropdown-item.component';
import { IconType } from '../../../lib/shared/models';

@Component({
	selector: 'ss-lib-dropdown-item-wrapper',
	standalone: true,
	imports: [DropdownItemComponent],
	template: `
		<ss-lib-dropdown-item
			[label]="label()"
			[value]="value()"
			[icon]="icon()"
			[isDestructive]="isDestructive()"
			[isDisabled]="isDisabled()"
			(valueEvent)="onValue($event)"
		></ss-lib-dropdown-item>
	`,
})
export class DropdownItemWrapperComponent {
	label = input<string>('');
	value = input<any>(null);
	icon = input<IconType | null>(null);
	isDestructive = input<boolean>(false);
	isDisabled = input<boolean>(false);

	onValue(value: any): void {
		console.log('Selected value:', value);
	}
}
