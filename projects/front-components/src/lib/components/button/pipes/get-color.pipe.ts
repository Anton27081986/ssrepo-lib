import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import { ButtonColors } from '../models/button-colors';
import { Colors } from '../../../shared/models';

@Pipe({
    standalone: true,
    name: 'getColor',
})
export class GetColorPipe implements PipeTransform {

    public transform(buttonColors: ButtonColors, isHover: boolean, isDisabled: boolean, isIconButton: boolean): Colors {
        if (isDisabled) {
            return isIconButton ? buttonColors.disabledIconOnly : buttonColors.disabled;
        }

        return isHover ? buttonColors.hover : buttonColors.default;
    }
}


