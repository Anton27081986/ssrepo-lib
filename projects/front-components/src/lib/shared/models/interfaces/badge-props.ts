import { IconType, Shape } from '../enums';
import { BadgeSizeType } from '../types';

export interface IBadgeProps {
    icon: IconType;
    size?: BadgeSizeType,
    shape?: Shape,
}