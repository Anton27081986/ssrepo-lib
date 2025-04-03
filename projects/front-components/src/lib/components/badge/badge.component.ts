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
 * Компонент для отображения бейджа с поддержкой различных статусов и размеров
 *
 * @example
 * ```html
 * Параметры:
 *
 * [badgeProps]: IBadgeProps - Свойства бейджа - обязательный,
 * по умолчанию: { shape: Shape.Square, size: ExtraSize.lg, status: Status.Default }
 *
 * <ss-lib-badge
 *   [badgeProps]="{
 *     text: 'Новый',
 *     color: Colors.Primary,
 *     shape: Shape.Square,
 *     size: ExtraSize.lg,
 *     status: Status.Default
 *   }"
 * ></ss-lib-badge>
 * ```
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
	public readonly badgeProps = input.required<IBadgeProps, IBadgeProps>({
		transform: this.setDefaultProps,
	});

	public readonly ExtraSize = ExtraSize;
	public readonly Colors = Colors;

	public readonly statusProps = computed(() => {
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

	public readonly layoutConfig = computed(() => {
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
