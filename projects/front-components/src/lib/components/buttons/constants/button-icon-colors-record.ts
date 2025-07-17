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
		disabledIconOnly: Colors.IconDisabled,
	},
	[ButtonType.Secondary]: {
		default: Colors.IconAction,
		hover: Colors.IconActionHover,
		pressed: Colors.IconActionHover,
		focused: Colors.IconAction,
		disabled: Colors.IconOnDisabled,
		disabledIconOnly: Colors.IconOnDisabled,
	},
	[ButtonType.Ghost]: {
		default: Colors.IconAction,
		hover: Colors.IconActionHover,
		pressed: Colors.IconAction,
		focused: Colors.IconAction,
		disabled: Colors.IconDisabled,
		disabledIconOnly: Colors.IconDisabled,
	},
	[ButtonType.Text]: {
		default: Colors.IconAction,
		hover: Colors.IconActionHover,
		pressed: Colors.IconAction,
		focused: Colors.IconAction,
		disabled: Colors.IconDisabled,
		disabledIconOnly: Colors.IconDisabled,
	},
	[ButtonType.Utility]: {
		default: Colors.IconDisabled,
		hover: Colors.IconAction,
		pressed: Colors.IconAction,
		focused: Colors.IconAction,
	},
	[ButtonType.CloseLight]: {
		default: Colors.IconDisabled,
		hover: Colors.IconActionHover2,
		pressed: Colors.IconActionHover2,
		focused: Colors.IconActionHover2,
	},
	[ButtonType.CloseDark]: {
		default: Colors.IconDisabled,
		hover: Colors.IconSecondary,
		pressed: Colors.IconSecondary,
		focused: Colors.IconSecondary,
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
		disabledIconOnly: Colors.IconDisabled,
	},
	[ButtonType.LinkBlack]: {
		default: Colors.IconAction,
		hover: Colors.IconAction,
		pressed: Colors.IconAction,
		focused: Colors.IconAction,
		disabled: Colors.IconDisabled,
		disabledIconOnly: Colors.IconDisabled,
	},
	[ButtonType.Overlay]: {
		default: Colors.IconOnAction,
		hover: Colors.IconOnAction,
		pressed: Colors.IconOnAction,
		focused: Colors.IconOnAction,
	},
};
