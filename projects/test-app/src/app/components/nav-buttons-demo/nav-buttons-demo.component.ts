import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavButtonComponent } from '../../../../../front-components/src/lib/components';
import { NAV_LIST } from '../../utils/constants/nav-buttons-list';
import { NavButton } from '../../../../../front-components/src/lib/shared/models';

@Component({
	selector: 'app-nav-buttons-demo',
	standalone: true,
	template: `<div class="section">
		<h2 class="section-title">Nav Buttons</h2>

		<p class="section-description">
			Navigation buttons with icons, text and expandable submenu.
		</p>

		<div class="sub-section">
			<h3 class="sub-section-title">Base Nav Buttons</h3>
			<div class="component-row">
				@for (menu of navList; track menu.title) {
					<ss-lib-nav-button
						[type]="NavButton.NavBase"
						[menu]="menu"
					></ss-lib-nav-button>
				}
			</div>
		</div>

		<div class="sub-section">
			<h3 class="sub-section-title">Icon-only Nav Buttons</h3>
			<div class="component-row">
				@for (menu of navList; track menu.title) {
					<ss-lib-nav-button
						[type]="NavButton.NavIcon"
						[menu]="menu"
					></ss-lib-nav-button>
				}
			</div>
		</div>
	</div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NavButtonComponent],
})
export class NavButtonsDemoComponent {
	protected readonly navList = NAV_LIST;
	protected readonly NavButton = NavButton;
}
