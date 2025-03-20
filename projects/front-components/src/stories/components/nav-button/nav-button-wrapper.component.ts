import { Component, input } from '@angular/core';
import { NavButtonComponent } from '../../../lib/components/nav-button/nav-button.component';
import { IMenu, NavButton, IconType } from '../../../lib/shared/models';

@Component({
	selector: 'ss-lib-nav-button-wrapper',
	standalone: true,
	imports: [NavButtonComponent],
	template: `
		<ss-lib-nav-button
			[type]="type()"
			[menu]="menu()"
		></ss-lib-nav-button>
	`,
})
export class NavButtonWrapperComponent {
	type = input<NavButton>(NavButton.NavBase);
	menu = input.required<IMenu>();
}
