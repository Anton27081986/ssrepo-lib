import { Colors, IconType } from '../enums';
import { BadgeSizeType } from '../types';

export interface IBadgeProps {
    icon: IconType;
    size: BadgeSizeType,
    iconColor?: Colors,
    borderColor?: Colors
}