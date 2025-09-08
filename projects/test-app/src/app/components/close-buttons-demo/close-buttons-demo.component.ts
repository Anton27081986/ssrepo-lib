import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CloseButtonComponent } from '../../../../../front-components/src/lib/components';
import {
	ButtonType,
	ExtraSize,
} from '../../../../../front-components/src/lib/shared/models';

@Component({
	selector: 'app-close-buttons-demo',
	standalone: true,
	template: ` <div class="section">
		<h2 class="section-title">Close Buttons</h2>

		<p class="section-description">
			Close buttons in dark and light variants with various sizes.
		</p>

		<div class="sub-section">
			<h3 class="sub-section-title">Dark Close Buttons</h3>

			<div class="component-row dark-background">
				<ss-lib-close-button
					[type]="ButtonType.CloseDark"
					[size]="ExtraSize.xxs"
				></ss-lib-close-button>

				<ss-lib-close-button
					[type]="ButtonType.CloseDark"
					[size]="ExtraSize.xs"
				></ss-lib-close-button>

				<ss-lib-close-button
					[type]="ButtonType.CloseDark"
					[size]="ExtraSize.sm"
				></ss-lib-close-button>

				<ss-lib-close-button
					[type]="ButtonType.CloseDark"
					[size]="ExtraSize.md"
				></ss-lib-close-button>

				<ss-lib-close-button
					[type]="ButtonType.CloseDark"
					[size]="ExtraSize.lg"
				></ss-lib-close-button>

				<ss-lib-close-button
					[type]="ButtonType.CloseDark"
					[size]="ExtraSize.xl"
				></ss-lib-close-button>

				<ss-lib-close-button
					[type]="ButtonType.CloseDark"
					[size]="ExtraSize.xxl"
				></ss-lib-close-button>

				<ss-lib-close-button
					class="disabled-demo"
					[type]="ButtonType.CloseDark"
					[size]="ExtraSize.xxl"
					[disabled]="true"
				></ss-lib-close-button>
			</div>
		</div>
		<div class="sub-section">
			<h3 class="sub-section-title">Light Close Buttons</h3>

			<div class="component-row">
				<ss-lib-close-button
					[type]="ButtonType.CloseLight"
					[size]="ExtraSize.xxs"
				></ss-lib-close-button>

				<ss-lib-close-button
					[type]="ButtonType.CloseLight"
					[size]="ExtraSize.xs"
				></ss-lib-close-button>

				<ss-lib-close-button
					[type]="ButtonType.CloseLight"
					[size]="ExtraSize.sm"
				></ss-lib-close-button>

				<ss-lib-close-button
					[type]="ButtonType.CloseLight"
					[size]="ExtraSize.md"
				></ss-lib-close-button>

				<ss-lib-close-button
					[type]="ButtonType.CloseLight"
					[size]="ExtraSize.lg"
				></ss-lib-close-button>

				<ss-lib-close-button
					[type]="ButtonType.CloseLight"
					[size]="ExtraSize.xl"
				></ss-lib-close-button>

				<ss-lib-close-button
					[type]="ButtonType.CloseLight"
					[size]="ExtraSize.xxl"
				></ss-lib-close-button>

				<ss-lib-close-button
					class="disabled-demo"
					[type]="ButtonType.CloseLight"
					[size]="ExtraSize.xxl"
					[disabled]="true"
				></ss-lib-close-button>
			</div>
		</div>
	</div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CloseButtonComponent],
})
export class CloseButtonsDemoComponent {
	protected readonly ButtonType = ButtonType;
	protected readonly ExtraSize = ExtraSize;
}
