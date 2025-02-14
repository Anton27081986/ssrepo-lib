import {IconType} from '../enums';

export interface IMenu {
  title: string,
  toolTip: string | null,
  link: string,
  pressed: boolean,
  icon: IconType
}
