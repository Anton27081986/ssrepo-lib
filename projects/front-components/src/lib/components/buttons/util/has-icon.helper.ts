import { IconType } from '../../../shared/models';

export function hasIcon(icon: IconType | null, isSideIcon: boolean): boolean {
    return isSideIcon && !!icon;
}