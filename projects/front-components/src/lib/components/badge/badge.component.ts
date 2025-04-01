import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import type { IBadgeProps } from '../../shared/models';
import { Colors, ExtraSize, Shape, Status } from '../../shared/models';

/**
 * Параметры:
 *
 * [badgeProps]: IBadgeProps - бейдж модального окна. Обязательное поле. По умолчанию `{
 * shape: Shape.Square,
 * size: ExtraSize.lg
 * status: Status.Default
 * }
 **
 */
@Component({
	selector: 'ss-lib-badge',
	standalone: true,
	imports: [IconComponent, NgClass],
	templateUrl: 'badge.component.html',
	styleUrls: ['badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
	public badgeProps = input.required<IBadgeProps, IBadgeProps>({
		transform: this.setDefaultProps,
	});

	public readonly ExtraSize = ExtraSize;
	public readonly Colors = Colors;

	public statusProps = computed(() => {
		switch (this.badgeProps().status) {
			case Status.Error:
				return {
					iconColor: Colors.IconError,
				};
			case Status.Warning:
				return {
					iconColor: Colors.IconWarning,
				};

			default:
				return { iconColor: Colors.IconPrimary };
		}
	});

	public layoutConfig = computed(() => {
		switch (this.badgeProps().size) {
			case ExtraSize.lg:
				return { iconSize: '24' };

			case ExtraSize.xl:
				return { iconSize: '28' };

			default: {
				return { iconSize: '20' };
			}
		}
	});

	public setDefaultProps(badgeData: IBadgeProps): IBadgeProps {
		return {
			...badgeData,
			shape: badgeData.shape ?? Shape.Square,
			size: badgeData.size ?? ExtraSize.lg,
			status: badgeData.status ?? Status.Default,
		};
	}
}
