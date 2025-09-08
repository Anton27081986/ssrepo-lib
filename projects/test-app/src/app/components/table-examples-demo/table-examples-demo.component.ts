import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DividerComponent } from '../../../../../front-components/src/lib/components';
import { TableExampleComponent } from '../table-example/table-example.component';
import { TableOperPlanExampleComponent } from '../table-oper-plan-example/table-oper-plan-example.component';

@Component({
	selector: 'app-table-examples-demo',
	standalone: true,
	template: ` <div class="section">
		<h2 class="section-title">Table Examples</h2>

		<p class="section-description">
			Custom table components for data display.
		</p>

		<div
			class="component-row"
			style="flex-direction: column; overflow: scroll"
		>
			<app-table-example class="spaced"></app-table-example>
		</div>

		<ss-lib-divider class="full-width" />

		<p class="section-description">
			Custom table components for data display with sticky columns in
			draggable mode, scrollable, resizable and hover on columns.
		</p>

		<div
			class="component-row"
			style="
					flex-direction: column;
					overflow: scroll;
					margin-top: 28px;
				"
		>
			<app-table-oper-plan-example
				class="spaced"
			></app-table-oper-plan-example>
		</div>
	</div>`,
	styles: [``],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		DividerComponent,
		TableExampleComponent,
		TableOperPlanExampleComponent,
	],
})
export class TableExamplesDemoComponent {}
