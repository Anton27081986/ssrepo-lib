import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
    signal,
    ViewEncapsulation
} from '@angular/core';
import { NgClass } from '@angular/common';
import { ButtonType, ExtraSize, IconType, IStateElement, LinkAppearance } from '../../../shared/models';
import { ElementStateService } from '../../../shared/services';
import { GetColorPipe } from '../pipes';
import { IconComponent } from '../../icon/icon.component';
import { MapperPipe } from '../../../core/pipes';
import { TextComponent } from '../../text/text.component';
import { EMPTY_STATE } from '../../../shared/constants';
import { BUTTON_ICON_COLORS_RECORD, BUTTON_TEXT_COLORS_RECORD } from '../constants';
import { IconPosition, StateTypes, TextType, TextWeight } from '../../../shared/models';
import { hasIcon } from '../util';

type LinkButtonType = ButtonType.LinkBlue | ButtonType.LinkBlack;

/**
 * Параметры:
 *
 * [type]: ButtonType.LinkBlue | ButtonType.LinkBlack- Тип. По умолчанию: `ButtonType.LinkBlue`
 *
 * [linkAppearance]: LinkAppearance - Вид кнопки. По умолчанию: `LinkAppearance.Standalone`
 *
 * [size]: ExtraSize - Размер кнопки. По умолчанию: `ExtraSize.md`
 *
 * [text]: string - Текст в кнопке
 *
 * [icon]: IconType | null - Название иконки.  По умолчанию: `null`
 *
 * [iconPosition]: IconPosition - Положение иконки в кнопке. По умолчанию: `IconPosition.Start`
 *
 * [disabled]: boolean - Блокировка кнопки. По умолчанию: `false`
 */
@Component({
    selector: 'ss-lib-link',
    standalone: true,
    imports: [
        NgClass,
        GetColorPipe,
        IconComponent,
        MapperPipe,
        TextComponent
    ],
    templateUrl: './link.component.html',
    styleUrl: './link.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class LinkComponent {
    protected readonly elementState = inject(ElementStateService);

    public type = input<LinkButtonType>(ButtonType.LinkBlue);
    public linkAppearance = input<LinkAppearance>(LinkAppearance.Standalone);
    public size = input<ExtraSize>(ExtraSize.md);
    public text = input<string | undefined>();
    public icon = input<IconType | null>(null);
    public iconPosition = input<IconPosition>(IconPosition.Start);
    public disabled = input<boolean>(false);

    public state = signal<IStateElement>(EMPTY_STATE);
    public buttonTextColors = computed(() => BUTTON_TEXT_COLORS_RECORD[this.type()!]);
    public buttonIconColors = computed(() => BUTTON_ICON_COLORS_RECORD[this.type()!]);
    public iconSize = computed(() => {
        switch (this.size()) {
            case ExtraSize.xxs:
            case ExtraSize.xs:
                return '16';
            case ExtraSize.sm:
            case ExtraSize.md:
                return '20';
            case ExtraSize.lg:
            case ExtraSize.xl:
            case ExtraSize.xxl:
                return '24';
        }
    });

    public readonly hasIcon = hasIcon;

    public readonly IconPosition = IconPosition;
    public readonly StateTypes = StateTypes;
    public readonly ButtonSize = ExtraSize;
    protected readonly TextType = TextType;
    protected readonly TextWeight = TextWeight;

    textUnderline(state: IStateElement, appearance: LinkAppearance, isDisabled: boolean): boolean {
        if (isDisabled) {
            return false;
        }

        return state.hover && appearance === LinkAppearance.Standalone ||
            state.default && appearance === LinkAppearance.Inline;
    }
}
