import { ButtonType, ButtonTypeValues, Colors } from '../../../shared/models';
import { IButtonStateColors } from '../models';

export const BUTTON_TEXT_COLORS_RECORD: Record<Partial<ButtonTypeValues>, Partial<IButtonStateColors>> = {
    [ButtonType.Primary]: {
        default: Colors.TextOnAction,
        hover: Colors.TextOnAction,
        pressed: Colors.TextOnAction,
        focused: Colors.TextOnAction,
        disabled: Colors.TextOnDisabled,
        disabledIconOnly: Colors.TextDisabled,

    },
    [ButtonType.Secondary]: {
        default: Colors.TextAction,
        hover: Colors.TextActionHover,
        pressed: Colors.TextActionHover,
        focused: Colors.TextAction,
        disabled: Colors.TextOnDisabled,
        disabledIconOnly: Colors.TextOnDisabled,
    },
    [ButtonType.Ghost]: {
        default: Colors.TextAction,
        hover: Colors.TextActionHover,
        pressed: Colors.TextActionHover,
        focused: Colors.TextAction,
        disabled: Colors.TextDisabled,
        disabledIconOnly: Colors.TextDisabled,
    },
    [ButtonType.Text]: {
        default: Colors.TextAction,
        hover: Colors.TextActionHover,
        pressed: Colors.TextAction,
        focused: Colors.TextAction,
        disabled: Colors.TextDisabled,
        disabledIconOnly: Colors.TextDisabled,
    },
    [ButtonType.Utility]: {},
    [ButtonType.CloseLight]: {},
    [ButtonType.CloseDark]: {},
    [ButtonType.Preview]: {},
    [ButtonType.Link]: {
        default: Colors.TextInformation,
        hover: Colors.TextInformation,
        pressed: Colors.TextInformation,
        focused: Colors.TextInformation,
        disabled: Colors.TextDisabled,
        disabledIconOnly: Colors.TextDisabled,
    },
};