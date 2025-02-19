import { ButtonType } from '../enums';




// export type ButtonTypeValues = typeof ButtonType[keyof typeof ButtonType];
export type ButtonTypeValues =
    ButtonType.Primary
    | ButtonType.Secondary
    | ButtonType.Ghost
    | ButtonType.Flat
    | ButtonType.Text
    | ButtonType.Link
    | ButtonType.Close;