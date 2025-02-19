import { Pipe, PipeTransform } from '@angular/core';
import { Colors, IStateElement } from '../../../shared/models';
import { IButtonStateColors } from '../models';

@Pipe({
    standalone: true,
    name: 'getColor',
})
export class GetColorPipe implements PipeTransform {

    public transform(buttonColors: IButtonStateColors, state: IStateElement, isDisabled: boolean, isIconButton: boolean): Colors {
        if (isDisabled) {
            return isIconButton ? buttonColors.disabledIconOnly : buttonColors.disabled;
        }

        if (state.hover) {
            return buttonColors.hover;
        }

        if (state.pressed) {
            return buttonColors.pressed;
        }

        if (state.focused) {
            return buttonColors.focused;
        }

        return buttonColors.default;
    }
}


