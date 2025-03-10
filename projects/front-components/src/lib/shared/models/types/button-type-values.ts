import type { ButtonType } from '../enums';

export type ButtonTypeValues = (typeof ButtonType)[keyof typeof ButtonType];
