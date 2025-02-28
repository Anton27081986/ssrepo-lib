import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common'
import { IconComponent } from '../icon/icon.component';
import { Colors, ExtraSize, IBadgeProps, Shape, Status } from '../../shared/models';

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
    imports: [
        IconComponent,
        NgClass,
        NgStyle
    ],
    templateUrl: 'badge.component.html',
    styleUrls: ['badge.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class BadgeComponent {
    public badgeProps = input.required<IBadgeProps, IBadgeProps>({
        transform: this.setDefaultProps
    });

    public setDefaultProps(badgeData: IBadgeProps): IBadgeProps {
        return {
            ...badgeData,
            shape: badgeData.shape ?? Shape.Square,
            size: badgeData.size ?? ExtraSize.lg,
            status: badgeData.status ?? Status.Default
        };
    }

    public statusProps = computed(() => {
        switch (this.badgeProps().status) {
            case Status.Error:
                return {iconColor: Colors.IconError, borderColor: Colors.BorderError};

            default:
                return {iconColor: Colors.IconPrimary, borderColor: null};
        }
    });

    public layoutConfig = computed(() => {
        switch (this.badgeProps().size) {
            case ExtraSize.lg:
                return {iconSize: '24'}

            case ExtraSize.xl:
                return {iconSize: '28'}

            default: {
                return {iconSize: '20'}
            }
        }
    });

    public readonly ExtraSize = ExtraSize;
    public readonly Colors = Colors;
}
