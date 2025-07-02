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

		// If disabled, return disabled colors immediately - don't process other states
		if (isDisabled) {
			if (buttonColors.disabledIconOnly && buttonColors.disabled) {
				return isIconButton
					? buttonColors.disabledIconOnly
					: buttonColors.disabled;
			}

			// Fallback to disabled color if available
			if (buttonColors.disabled) {
				return buttonColors.disabled;
			}
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
