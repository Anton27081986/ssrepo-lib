import { ButtonType, Colors } from '../../../../shared/models';
import { ButtonColors } from '../../models/button-colors';

export const ButtonTextColorsRecord: Record<ButtonType, ButtonColors> = {
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
        disabledIconOnly: Colors.TextDisabled,
    },
    [ButtonType.Flat]: {
        default: Colors.TextAction,
        hover: Colors.TextActionHover,
        pressed: Colors.TextActionHover,
        focused: Colors.TextAction,
        disabled: Colors.TextDisabled,
        disabledIconOnly: Colors.TextDisabled,
    },
    [ButtonType.Close]: {
        default: Colors.TextAction,
        hover: Colors.TextActionHover,
        pressed: Colors.TextActionHover,
        focused: Colors.TextAction,
        disabled: Colors.TextDisabled,
        disabledIconOnly: Colors.TextDisabled,
    },
    [ButtonType.Link]: {
        default: Colors.TextInformation,
        hover: Colors.TextInformation,
        pressed: Colors.TextInformation,
        focused: Colors.TextInformation,
        disabled: Colors.TextDisabled,
        disabledIconOnly: Colors.TextDisabled,
    },
};