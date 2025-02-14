import { Component, computed, input, Signal, signal } from '@angular/core';
import { NgClass } from "@angular/common";
import { MapperPipe } from '../../core/pipes';
import {
    IStateElement,
    ButtonType,
    Colors,
    IconPosition,
    IconType,
    Size,
    StateTypes,
    TextType,
    TextWeight
} from '../../shared/models';
import { TextComponent } from '../text/text.component';
import { IconComponent } from '../icon/icon.component';
import { GetColorPipe } from './pipes';
import { EMPTY_STATE, ButtonIconColorsRecord, ButtonTextColorsRecord } from './utils/constants';

/**
 * Параметры:
 *
 * [type]: ButtonType - Стиль кнопки. По умолчанию: `ButtonType.Primary`
 *
 * [size]: Size - Размер кнопки. По умолчанию: `Size.Default`
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
    selector: 'ss-lib-button',
    standalone: true,
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    imports: [
        NgClass,
        TextComponent,
        GetColorPipe,
        IconComponent,
        MapperPipe
    ],
})
export class ButtonComponent {
    public type = input<ButtonType>(ButtonType.Primary);
    public size = input<Size>(Size.Large);
    public text = input<string | undefined>();
    public icon = input<IconType | null>(IconType.Bell);
    public iconPosition = input<IconPosition>(IconPosition.Start);
    public disabled = input<boolean>(false);

    public state = signal<IStateElement>(EMPTY_STATE);

    public readonly IconPosition = IconPosition;
    public readonly TextType = TextType;
    public readonly TextWeight = TextWeight;
    public readonly Colors = Colors;
    public readonly ButtonSize = Size;
    public readonly StateTypes = StateTypes;

    public readonly colorsIconBtn: Signal<{
        default: Colors,
        hover: Colors,
        pressed: Colors,
        focused: Colors,
        disabled: Colors,
        disabledIconOnly: Colors
    }> = computed(() => {
        return ButtonIconColorsRecord[this.type()];
    });

    public readonly colorsTextBtn: Signal<{
        default: Colors,
        hover: Colors,
        pressed: Colors,
        focused: Colors,
        disabled: Colors,
        disabledIconOnly: Colors
    }> = computed(() => {
        return ButtonTextColorsRecord[this.type()];
    });

    public isIconButton(type: ButtonType, iconPosition: IconPosition): boolean {
        return iconPosition === IconPosition.OnlyIcon || type === ButtonType.Close;
    }

    public hasIconOnSide(icon: IconType | null, isSideIcon: boolean): boolean {
        return isSideIcon && !!icon;
    }

    public checkFocus(event: Event): void {
        const target = event.target as HTMLElement;

        if (target.matches(':focus-visible')) {
            this.updateState(StateTypes.Focused, true);
        }
    }

    public updateState(stateType: StateTypes, stateValue: boolean): void {
        if (!stateValue) {
            this.state.set(EMPTY_STATE);

            return;
        }

        this.state.set({
            ...EMPTY_STATE,
            [stateType.toLowerCase() as keyof IStateElement]: stateValue
        })
    }
}
