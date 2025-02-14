import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {appImports} from '../app.imports';
import {
  ButtonType,
  Colors,
  IconPosition,
  IconType, IDictionaryItemDto, IMenu, Size,
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
  protected readonly dropdownItems: IDictionaryItemDto[] = [
    {
      id: 1,
      name: 'option1'
    },
    {
      id: 2,
      name: 'option2'
    },
    {
      id: 3,
      name: 'option3'
    },
    {
      id: 4,
      name: 'option4'
    },
    {
      id: 5,
      name: 'option5'
    },
    {
      id: 6,
      name: 'option6'
    },
    {
      id: 7,
      name: 'option7'
    }
  ];

  toggleCtrl = new FormControl(false);

  inputCtrl = new FormControl('rrrr', [Validators.required, Validators.minLength(10)]);

  textareaCtrl = new FormControl('rrrr', [Validators.required, Validators.minLength(10)]);

  selectCtrl = new FormControl(null);
  protected readonly DividerType = DividerType;
}
