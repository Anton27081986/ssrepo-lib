import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
	IconComponent,
	TooltipDirective,
} from '../../../../../front-components/src/lib/components';
import {
	Colors,
	IconType,
	TooltipPosition,
} from '../../../../../front-components/src/lib/shared/models';

@Component({
	selector: 'app-tooltip-demo',
	standalone: true,
	template: ` <div class="section">
		<h2 class="section-title">Tooltip</h2>
		<p class="section-description">
			Icon with tooltip for additional information.
		</p>
		<div class="component-row">
			<ss-lib-icon
				ss-lib-tooltip
				[icon]="IconType.Plus"
				[color]="Colors.IconOnDisabled"
				[tooltipText]="'Это тултип'"
				[position]="TooltipPosition.TopLeft"
			></ss-lib-icon>

			<ss-lib-icon
				ss-lib-tooltip
				[icon]="IconType.Plus"
				[color]="Colors.IconOnDisabled"
				[tooltipText]="'Это тултип'"
				[position]="TooltipPosition.Top"
			></ss-lib-icon>

			<ss-lib-icon
				ss-lib-tooltip
				[icon]="IconType.Plus"
				[color]="Colors.IconOnDisabled"
				[tooltipText]="'Это тултип'"
				[position]="TooltipPosition.TopRight"
			></ss-lib-icon>

			<ss-lib-icon
				ss-lib-tooltip
				[icon]="IconType.Plus"
				[color]="Colors.IconOnDisabled"
				[tooltipText]="'Это тултип'"
				[position]="TooltipPosition.Right"
			></ss-lib-icon>

			<ss-lib-icon
				ss-lib-tooltip
				[icon]="IconType.Plus"
				[color]="Colors.IconOnDisabled"
				[tooltipText]="'Это тултип'"
				[position]="TooltipPosition.BottomRight"
			></ss-lib-icon>

			<ss-lib-icon
				ss-lib-tooltip
				[icon]="IconType.Plus"
				[color]="Colors.IconOnDisabled"
				[tooltipText]="'Это тултип'"
				[position]="TooltipPosition.Bottom"
			></ss-lib-icon>

			<ss-lib-icon
				ss-lib-tooltip
				[icon]="IconType.Plus"
				[color]="Colors.IconOnDisabled"
				[tooltipText]="'Это тултип'"
				[position]="TooltipPosition.BottomLeft"
			></ss-lib-icon>

			<ss-lib-icon
				ss-lib-tooltip
				[icon]="IconType.Plus"
				[color]="Colors.IconOnDisabled"
				[tooltipText]="'Это тултип'"
				[position]="TooltipPosition.Left"
			></ss-lib-icon>
		</div>
	</div>`,
	styles: [``],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [IconComponent, TooltipDirective],
})
export class TooltipDemoComponent {
	protected readonly IconType = IconType;
	protected readonly Colors = Colors;
	protected readonly TooltipPosition = TooltipPosition;
}
