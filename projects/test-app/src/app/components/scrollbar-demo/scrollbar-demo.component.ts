import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RepeatTimesPipe } from '../../../../../front-components/src/lib/core/pipes';
import { ScrollbarComponent } from '../../../../../front-components/src/lib/components';

@Component({
	selector: 'app-scrollbar-demo',
	standalone: true,
	template: ` <div class="section">
		<h2 class="section-title">Scrollbar</h2>

		<p class="section-description">Custom scrollbar with sample content.</p>

		<div class="component-row">
			<div class="scrollbar-test">
				<ss-lib-scrollbar>
					@for (colCount of 100 | repeatTimes; track $index) {
						<div class="scrollbar-test__item">
							Товарищи! сложившаяся структура организации играет
							важную роль в формировании модели развития
						</div>
					}
				</ss-lib-scrollbar>
			</div>
		</div>
	</div>`,
	styles: [``],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RepeatTimesPipe, ScrollbarComponent],
})
export class ScrollbarDemoComponent {}
