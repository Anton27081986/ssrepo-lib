import { Pipe, PipeTransform } from '@angular/core';
import { IButtonStateColors } from '../models';
import { Colors, IStateElement } from '../../../shared/models';

@Pipe({
    standalone: true,
    name: 'getColor',
})
export class GetColorPipe implements PipeTransform {

    public transform(buttonColors: Partial<IButtonStateColors> | undefined, state: IStateElement, isDisabled: boolean, isIconButton: boolean): Colors {
        if (!buttonColors) {
            return Colors.TextError;
        }

        if (isDisabled && buttonColors.disabledIconOnly && buttonColors.disabled) {
            return isIconButton ? buttonColors.disabledIconOnly : buttonColors.disabled;
        }

        if (state.hover && buttonColors.hover) {
            return buttonColors.hover;
        }

        if (state.pressed && buttonColors.pressed) {
            return buttonColors.pressed;
        }

        if (state.focused && buttonColors.focused) {
            return buttonColors.focused;
        }

        return buttonColors.default ? buttonColors.default : Colors.TextError;
    }
}


