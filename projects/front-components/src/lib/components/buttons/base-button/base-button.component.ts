import { Component, computed, inject, input, InputSignal, signal } from '@angular/core';
import { NgClass } from "@angular/common";
import { GetColorPipe } from '../pipes';
import { BUTTON_ICON_COLORS_RECORD, BUTTON_TEXT_COLORS_RECORD } from '../constants';
import {
    IStateElement,
    Colors,
    IconPosition,
    IconType,
    StateTypes,
    TextType,
    TextWeight, ButtonTypeValues, ExtraSize
} from '../../../shared/models';
import { MapperPipe } from '../../../core/pipes';
import { IconComponent } from '../../icon/icon.component';
import { TextComponent } from '../../text/text.component';
import { ElementStateService } from '../../../shared/services';
import { EMPTY_STATE } from '../../../shared/constants';

@Component({
    selector: 'ss-lib-base-button',
    standalone: true,
    templateUrl: './base-button.component.html',
    styleUrls: ['./base-button.component.scss'],
    imports: [
        NgClass,
        TextComponent,
        GetColorPipe,
        IconComponent,
        MapperPipe,
        MapperPipe,
        IconComponent,
    ],
})
export class BaseButtonComponent {
    protected readonly elementState = inject(ElementStateService);

    public type: InputSignal<ButtonTypeValues | null> = input<ButtonTypeValues | null>(null);
    public size = input<ExtraSize>(ExtraSize.md);
    public text = input<string | undefined>();
    public icon = input<IconType | null>(null);
    public iconPosition = input<IconPosition>(IconPosition.Start);
    public disabled = input<boolean>(false);

    public state = signal<IStateElement>(EMPTY_STATE);
    public buttonTextColors = computed(() => BUTTON_TEXT_COLORS_RECORD[this.type()!]);
    public buttonIconColors = computed(() => BUTTON_ICON_COLORS_RECORD[this.type()!]);

    public readonly IconPosition = IconPosition;
    public readonly TextType = TextType;
    public readonly TextWeight = TextWeight;
    public readonly Colors = Colors;
    public readonly ButtonSize = ExtraSize;
    public readonly StateTypes = StateTypes;

    public hasIcon(icon: IconType | null, isSideIcon: boolean): boolean {
        return isSideIcon && !!icon;
    }
}
