import type { ButtonTypeValues } from '../../../shared/models';
import { ButtonType, Colors } from '../../../shared/models';
import type { IButtonStateColors } from '../models';

export const BUTTON_TEXT_COLORS_RECORD: Record<
	Partial<ButtonTypeValues>,
	Partial<IButtonStateColors>
> = {
	[ButtonType.Primary]: {
		default: Colors.TextOnAction,
		hover: Colors.TextOnAction,
		pressed: Colors.TextOnAction,
		focused: Colors.TextOnAction,
		disabled: Colors.TextOnDisabled,
	},
	[ButtonType.Secondary]: {
		default: Colors.TextAction2,
		hover: Colors.TextActionHover2,
		pressed: Colors.TextActionHover2,
		focused: Colors.TextAction2,
		disabled: Colors.TextOnDisabled,
	},
	[ButtonType.Ghost]: {
		default: Colors.TextAction2,
		hover: Colors.TextActionHover2,
		pressed: Colors.TextActionHover2,
		focused: Colors.TextAction2,
		disabled: Colors.TextDisabled,
	},
	[ButtonType.TextPrimary]: {
		default: Colors.TextInformation,
		hover: Colors.TextInformationHover,
		pressed: Colors.TextInformationHover,
		focused: Colors.TextInformation,
		disabled: Colors.TextDisabled,
	},
	[ButtonType.TextSecondary]: {
		default: Colors.TextAction2,
		hover: Colors.TextActionHover2,
		pressed: Colors.TextActionHover2,
		focused: Colors.TextAction2,
		disabled: Colors.TextDisabled,
	},
	[ButtonType.Utility]: {},
	[ButtonType.CloseLight]: {},
	[ButtonType.CloseDark]: {},
	[ButtonType.Preview]: {},
	[ButtonType.Overlay]: {},
	[ButtonType.LinkBlue]: {
		default: Colors.TextInformation,
		hover: Colors.TextInformation,
		pressed: Colors.TextInformation,
		focused: Colors.TextInformation,
		disabled: Colors.TextDisabled,
	},
	[ButtonType.LinkBlack]: {
		default: Colors.TextAction2,
		hover: Colors.TextAction2,
		pressed: Colors.TextAction2,
		focused: Colors.TextAction2,
		disabled: Colors.TextDisabled,
	},
};
