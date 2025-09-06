import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BadgeComponent } from '../../../../../front-components/src/lib/components';
import {
	ExtraSize,
	IconType,
	Status,
	Shape,
} from '../../../../../front-components/src/lib/shared/models';

@Component({
	selector: 'app-badges-demo',
	standalone: true,
	template: ` <div class="section">
		<h2 class="section-title">Badges</h2>
		<p class="section-description">
			Badge components with different sizes, shapes, and statuses.
		</p>

		<div class="sub-section">
			<h3 class="sub-section-title">Medium Badges</h3>
			<div class="component-row">
				<ss-lib-badge
					[badgeProps]="{
						size: ExtraSize.md,
						icon: IconType.ImagePlus,
					}"
				></ss-lib-badge>

				<ss-lib-badge
					[badgeProps]="{
						size: ExtraSize.md,
						icon: IconType.ImagePlus,
						status: Status.Success,
					}"
				></ss-lib-badge>

				<ss-lib-badge
					[badgeProps]="{
						size: ExtraSize.md,
						icon: IconType.ImagePlus,
						status: Status.Warning,
					}"
				></ss-lib-badge>

				<ss-lib-badge
					[badgeProps]="{
						size: ExtraSize.md,
						icon: IconType.ImagePlus,
						status: Status.Error,
					}"
				></ss-lib-badge>
			</div>
			<div class="component-row">
				<ss-lib-badge
					[badgeProps]="{
						size: ExtraSize.md,
						icon: IconType.ImagePlus,
						shape: Shape.Round,
					}"
				></ss-lib-badge>

				<ss-lib-badge
					[badgeProps]="{
						size: ExtraSize.md,
						icon: IconType.ImagePlus,
						status: Status.Success,
						shape: Shape.Round,
					}"
				></ss-lib-badge>

				<ss-lib-badge
					[badgeProps]="{
						size: ExtraSize.md,
						icon: IconType.ImagePlus,
						status: Status.Warning,
						shape: Shape.Round,
					}"
				></ss-lib-badge>

				<ss-lib-badge
					[badgeProps]="{
						size: ExtraSize.md,
						icon: IconType.ImagePlus,
						status: Status.Error,
						shape: Shape.Round,
					}"
				></ss-lib-badge>
			</div>
		</div>

		<div class="sub-section">
			<h3 class="sub-section-title">Large Badges</h3>
			<div class="component-row">
				<ss-lib-badge
					[badgeProps]="{
						size: ExtraSize.lg,
						icon: IconType.ImagePlus,
					}"
				></ss-lib-badge>

				<ss-lib-badge
					[badgeProps]="{
						size: ExtraSize.lg,
						icon: IconType.ImagePlus,
						status: Status.Success,
					}"
				></ss-lib-badge>

				<ss-lib-badge
					[badgeProps]="{
						size: ExtraSize.lg,
						icon: IconType.ImagePlus,
						status: Status.Warning,
					}"
				></ss-lib-badge>

				<ss-lib-badge
					[badgeProps]="{
						size: ExtraSize.lg,
						icon: IconType.ImagePlus,
						status: Status.Error,
					}"
				></ss-lib-badge>
			</div>
			<div class="component-row">
				<ss-lib-badge
					[badgeProps]="{
						size: ExtraSize.lg,
						icon: IconType.ImagePlus,
						shape: Shape.Round,
					}"
				></ss-lib-badge>

				<ss-lib-badge
					[badgeProps]="{
						size: ExtraSize.lg,
						icon: IconType.ImagePlus,
						status: Status.Success,
						shape: Shape.Round,
					}"
				></ss-lib-badge>

				<ss-lib-badge
					[badgeProps]="{
						size: ExtraSize.lg,
						icon: IconType.ImagePlus,
						status: Status.Warning,
						shape: Shape.Round,
					}"
				></ss-lib-badge>

				<ss-lib-badge
					[badgeProps]="{
						size: ExtraSize.lg,
						icon: IconType.ImagePlus,
						status: Status.Error,
						shape: Shape.Round,
					}"
				></ss-lib-badge>
			</div>
		</div>
		<div class="sub-section">
			<h3 class="sub-section-title">Extra Large Badges</h3>
			<div class="component-row">
				<ss-lib-badge
					[badgeProps]="{
						size: ExtraSize.xl,
						icon: IconType.ImagePlus,
					}"
				></ss-lib-badge>

				<ss-lib-badge
					[badgeProps]="{
						size: ExtraSize.xl,
						icon: IconType.ImagePlus,
						status: Status.Success,
					}"
				></ss-lib-badge>

				<ss-lib-badge
					[badgeProps]="{
						size: ExtraSize.xl,
						icon: IconType.ImagePlus,
						status: Status.Warning,
					}"
				></ss-lib-badge>

				<ss-lib-badge
					[badgeProps]="{
						size: ExtraSize.xl,
						icon: IconType.ImagePlus,
						status: Status.Error,
					}"
				></ss-lib-badge>
			</div>
			<div class="component-row">
				<ss-lib-badge
					[badgeProps]="{
						size: ExtraSize.xl,
						icon: IconType.ImagePlus,
						shape: Shape.Round,
					}"
				></ss-lib-badge>

				<ss-lib-badge
					[badgeProps]="{
						size: ExtraSize.xl,
						icon: IconType.ImagePlus,
						status: Status.Success,
						shape: Shape.Round,
					}"
				></ss-lib-badge>

				<ss-lib-badge
					[badgeProps]="{
						size: ExtraSize.xl,
						icon: IconType.ImagePlus,
						status: Status.Warning,
						shape: Shape.Round,
					}"
				></ss-lib-badge>

				<ss-lib-badge
					[badgeProps]="{
						size: ExtraSize.xl,
						icon: IconType.ImagePlus,
						status: Status.Error,
						shape: Shape.Round,
					}"
				></ss-lib-badge>
			</div>
		</div>
	</div>`,
	styles: [``],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [BadgeComponent],
})
export class BadgesDemoComponent {
	protected readonly ExtraSize = ExtraSize;
	protected readonly IconType = IconType;
	protected readonly Status = Status;
	protected readonly Shape = Shape;
}
