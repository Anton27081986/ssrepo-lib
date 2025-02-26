import {
    ChangeDetectionStrategy,
    Component,
    computed, HostBinding,
    input,
    InputSignal,
    Signal,
} from '@angular/core';
import { NgClass, NgStyle } from '@angular/common'
import { IconComponent } from '../icon/icon.component';
import { ExtraSize, Shape, IBadgeProps, Colors } from '../../shared/models';

/**
 * Параметры:
 *
 * [badgeProps]: IBadgeProps - бейдж модального окна. Обязательное поле`
 *
 * [type]: Shape - форма (круглый/квадратный). По умолчанию `Shape.Square`
 **
 * [footerRef]: TemplateRef<any> | undefined - футер модального окна.  По умолчанию: `undefined`
 */
@Component({
    selector: 'ss-lib-badge',
    standalone: true,
    imports: [
        IconComponent,
        NgStyle,
        NgClass
    ],
    templateUrl: 'badge.component.html',
    styleUrls: ['badge.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class BadgeComponent {
    public badgeProps = input.required<IBadgeProps>();
    public type: InputSignal<Shape> = input<Shape>(Shape.Square);

    @HostBinding('style.--effects-shadows-18')
    get shadowColorVariable() {
        return this.badgeProps()?.borderColor || null;
    }

    public layoutConfig: Signal<{ padding: string, iconSize: string }> = computed(() => {
        if (this.badgeProps().size === ExtraSize.lg) {
            return {
                padding: '11px',
                iconSize: '24'
            }
        }

        if (this.badgeProps().size === ExtraSize.xl) {
            return {
                padding: '13px',
                iconSize: '28'
            }
        }

        return {
            padding: '9px',
            iconSize: '20'
        }
    });

    public readonly ExtraSize = ExtraSize;
    public readonly Colors = Colors;
}
