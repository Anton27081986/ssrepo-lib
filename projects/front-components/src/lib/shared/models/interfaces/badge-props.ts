import type { IconType, Shape, Status } from '../enums';
import type { BadgeSizeType } from '../types';

export interface IBadgeProps {
	icon: IconType;
	size?: BadgeSizeType;
	shape?: Shape;
	status?: Status.Error | Status.Default | Status.Warning;
}
