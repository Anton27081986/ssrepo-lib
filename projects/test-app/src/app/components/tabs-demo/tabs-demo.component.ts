import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TabsComponent } from '../../../../../front-components/src/lib/components';
import { TABS } from '../../stand/constants';

@Component({
	selector: 'app-tabs-demo',
	standalone: true,
	template: ` <div class="section">
		<h2 class="section-title">Tabs</h2>

		<p class="section-description">Tab navigation with custom actions.</p>

		<div class="spaced">
			<ss-lib-tabs
				[tabs]="TABS"
				[activeTabIndex]="indexTab"
				(changeIndexEmit)="changeTab($event)"
			></ss-lib-tabs>
		</div>

		<div>Выбрана вкладка: {{ indexTab + 1 }}</div>
	</div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TabsComponent],
})
export class TabsDemoComponent {
	public indexTab = 0;

	protected readonly TABS = TABS;

	public changeTab(index: number): void {
		this.indexTab = index;
	}
}
