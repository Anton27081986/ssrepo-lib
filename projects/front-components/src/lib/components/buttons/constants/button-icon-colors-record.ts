import type { IButtonStateColors } from '../models';
import type { ButtonTypeValues } from '../../../shared/models';
import { ButtonType, Colors } from '../../../shared/models';

export const BUTTON_ICON_COLORS_RECORD: Record<
	Partial<ButtonTypeValues>,
	Partial<IButtonStateColors>
> = {
	[ButtonType.Primary]: {
		default: Colors.IconOnAction,
		hover: Colors.IconOnAction,
		pressed: Colors.IconOnAction,
		focused: Colors.IconOnAction,
		disabled: Colors.IconOnDisabled,
	},
	[ButtonType.Secondary]: {
		default: Colors.IconAction2,
		hover: Colors.IconActionHover2,
		pressed: Colors.IconActionHover2,
		focused: Colors.IconAction2,
		disabled: Colors.IconOnDisabled,
	},
	[ButtonType.Ghost]: {
		default: Colors.IconAction2,
		hover: Colors.IconActionHover2,
		pressed: Colors.IconActionHover2,
		focused: Colors.IconAction2,
		disabled: Colors.IconDisabled,
	},
	[ButtonType.TextPrimary]: {
		default: Colors.IconInformation,
		hover: Colors.IconInformationHover,
		pressed: Colors.IconInformationPressed,
		focused: Colors.IconInformation,
		disabled: Colors.IconDisabled,
	},
	[ButtonType.TextSecondary]: {
		default: Colors.IconAction2,
		hover: Colors.IconActionHover2,
		pressed: Colors.IconActionPressed2,
		focused: Colors.IconAction2,
		disabled: Colors.IconDisabled,
	},

	[ButtonType.Utility]: {
		default: Colors.IconDisabled,
		hover: Colors.IconAction2,
		pressed: Colors.IconActionHover2,
		focused: Colors.IconAction2,
	},
	[ButtonType.CloseLight]: {
		default: Colors.IconDisabled,
		hover: Colors.IconActionHover2,
		pressed: Colors.IconActionHover2,
		focused: Colors.IconActionHover2,
	},
	[ButtonType.CloseDark]: {
		default: Colors.IconDisabled,
		hover: Colors.IconActionHover2OnColor,
		pressed: Colors.IconActionHover2OnColor,
		focused: Colors.IconActionHover2OnColor,
	},
	[ButtonType.Preview]: {
		default: Colors.IconOnAction,
		hover: Colors.IconOnAction,
		pressed: Colors.IconOnAction,
		focused: Colors.IconOnAction,
	},
	[ButtonType.LinkBlue]: {
		default: Colors.IconInformation,
		hover: Colors.IconInformation,
		pressed: Colors.IconInformation,
		focused: Colors.IconInformation,
		disabled: Colors.IconDisabled,
	},
	[ButtonType.LinkBlack]: {
		default: Colors.IconAction2,
		hover: Colors.IconAction2,
		pressed: Colors.IconAction2,
		focused: Colors.IconAction2,
		disabled: Colors.IconDisabled,
	},
	[ButtonType.Backdrop]: {
		default: Colors.IconOnAction,
		hover: Colors.IconOnAction,
		pressed: Colors.IconOnAction,
		focused: Colors.IconOnAction,
	},
};
