import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import type { IButtonStateColors } from '../models';
import type { IStateElement } from '../../../shared/models';
import { Colors } from '../../../shared/models';

@Pipe({
	standalone: true,
	name: 'getColor',
})
export class GetColorPipe implements PipeTransform {
	public transform(
		buttonColors: Partial<IButtonStateColors> | undefined,
		state: IStateElement,
		isDisabled: boolean,
		isIconButton: boolean,
		isActive = false,
	): Colors {
		if (!buttonColors) {
			return Colors.TextError;
		}

		if (isDisabled && buttonColors.disabled) {
			return isIconButton ? buttonColors.disabled : buttonColors.disabled;
		}

		if (isActive && buttonColors.hover) {
			return buttonColors.hover;
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
