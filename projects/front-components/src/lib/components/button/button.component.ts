import { Component, computed, input, Signal, signal } from '@angular/core';
import { NgClass } from "@angular/common";
import { MapperPipe } from '../../core/pipes';
import { ButtonType, Colors, IconPosition, IconType, Size, TextType, TextWeight } from '../../shared/models';
import { TextComponent } from '../text/text.component';
import { IconComponent } from '../icon/icon.component';

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
 *
 * [loading]: boolean - Показывать лоадер. По умолчанию: `false`
 */

@Component({
    selector: 'ss-lib-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    imports: [
        NgClass,
        TextComponent,
        MapperPipe,
        IconComponent
    ],
    standalone: true
})
export class ButtonComponent {
    public type = input<ButtonType>(ButtonType.Primary);
    public size = input<Size>(Size.Large);
    public text = input<string | undefined>();
    public iconPosition = input<IconPosition>(IconPosition.Start);
    public icon = input<IconType | null>(IconType.Bell);
    public disabled = input<boolean>(false);
    public loading = input<boolean>(false);

    public isHover = signal<boolean>(false);

    public readonly IconPosition = IconPosition;
    public readonly TextType = TextType;
    public readonly TextWeight = TextWeight;
    public readonly Colors = Colors;
    public readonly ButtonSize = Size;

    public readonly colorsIconBtn: Signal<{ default: Colors, hover: Colors, disabled: Colors }> = computed(() => {
        switch (this.type()) {
            case ButtonType.Primary: {
                return {
                    default: Colors.IconOnAction,
                    hover: Colors.IconOnAction,
                    disabled: Colors.IconOnDisabled,
                };
            }

            case ButtonType.Secondary: {
                return {
                    default: Colors.IconAction,
                    hover: Colors.IconAction,
                    disabled: Colors.IconOnDisabled,
                };
            }
            case ButtonType.Flat: {
                return {
                    default: Colors.IconAction,
                    hover: Colors.IconActionHover,
                    disabled: Colors.IconDisabled
                };
            }

            case ButtonType.Close: {
                return {
                    default: Colors.IconDisabled,
                    hover: Colors.IconAction,
                    disabled: Colors.IconAction
                };
            }

            case ButtonType.Link: {
                return {
                    default: Colors.IconAction,
                    hover: Colors.IconActionHover,
                    disabled: Colors.IconDisabled
                };
            }
            default:
                return {
                    default: Colors.IconOnAction,
                    hover: Colors.IconOnAction,
                    disabled: Colors.IconDisabled
                };
        }
    });

    public readonly colorsTextBtn: Signal<{ default: Colors, hover: Colors, disabled: Colors }> = computed(() => {
        switch (this.type()) {
            case ButtonType.Primary: {
                return {
                    default: Colors.TextOnAction,
                    hover: Colors.TextOnAction,
                    disabled: Colors.TextOnDisabled,
                };
            }

            case ButtonType.Secondary: {
                return {
                    default: Colors.TextAction,
                    hover: Colors.TextAction,
                    disabled: Colors.TextOnDisabled,
                };
            }
            case ButtonType.Flat: {
                return {
                    default: Colors.TextAction,
                    hover: Colors.TextActionHover,
                    disabled: Colors.TextDisabled
                };
            }

            case ButtonType.Link: {
                return {
                    default: Colors.TextAction,
                    hover: Colors.TextActionHover,
                    disabled: Colors.TextDisabled
                };
            }
            default:
                return {
                    default: Colors.IconOnAction,
                    hover: Colors.IconOnAction,
                    disabled: Colors.IconDisabled
                };
        }
    });

    public getColor(isHover: boolean, isDisabled: boolean, defaultColor: Colors, hoverColor: Colors, disabledColor: Colors | undefined): Colors {
        if (isDisabled && disabledColor) {
            return disabledColor;
        }

        return isHover ? hoverColor : defaultColor;
    }

    public isIconButton(type: ButtonType, iconPosition: IconPosition): boolean {
        return iconPosition === IconPosition.OnlyIcon || type === ButtonType.Close;
    }

    public hasIconOnSide(icon: IconType | null, isSideIcon: boolean): boolean {
        return isSideIcon && !!icon;
    }
}
