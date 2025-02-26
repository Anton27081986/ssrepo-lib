import { IconType, Shape, Status } from '../enums';
import { BadgeSizeType } from '../types';

export interface IBadgeProps {
    icon: IconType;
    size?: BadgeSizeType,
    shape?: Shape,
    status?: Status.Error | Status.Default
}