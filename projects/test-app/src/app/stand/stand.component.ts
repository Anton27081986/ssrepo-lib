import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {appImports} from '../app.imports';
import {
  ButtonType,
  Colors,
  IconPosition,
  IconType, IMenu, Size,
  TextType,
  TextWeight
} from '../../../../front-components/src/lib/shared/models';
import {DividerType} from '../../../../front-components/src/lib/shared/models/enums/divider-type';

@Component({
  selector: 'app-stand',
  standalone: true,
  imports: [appImports],
  templateUrl: './stand.component.html',
  styleUrl: './stand.component.scss'
})
export class StandComponent {
  protected readonly TextType = TextType;
  protected readonly TextWeight = TextWeight;
  protected readonly IconType = IconType;
  protected readonly Colors = Colors;
  protected readonly ButtonType = ButtonType;
  protected readonly IconPosition = IconPosition;
  protected readonly Size = Size;

  protected toggleCtrl = new FormControl(false);

  protected exampleMenu: IMenu = {
    title: 'Баннеры',
    toolTip: 'Баннеры',
    link: '',
    pressed: true,
    icon: IconType.Alert
  }
  protected readonly DividerType = DividerType;
}
