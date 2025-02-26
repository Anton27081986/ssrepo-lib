import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
    ButtonType,
    Colors, ExtraSize,
    IconPosition,
    IconType,
    IDictionaryItemDto,
    Shape,
    TextType,
    TextWeight
} from '../../../../front-components/src/lib/shared/models';
import { DividerType } from '../../../../front-components/src/lib/shared/models/enums/divider-type';
import { standImports } from './stand.imports';
import { BadgeType } from '../../../../front-components/src/lib/shared/models/enums/badge-type';
import { LinkAppearance } from '../../../../front-components/src/lib/components/buttons/models';
import {ColumnsStateService} from '../../../../front-components/src/lib/components';
import {
  IStoreTableBaseColumn
} from '../../../../front-components/src/lib/shared/models/interfaces/store-table-base-column';

export enum ExampleRowItemField {
  example1 = 'example1',
  example2 = 'example2',
  example3 = 'example3',
  example4 = 'example4',
  example5 = 'example5',
  example6 = 'example6',
}


@Component({
    selector: 'app-stand',
    standalone: true,
    imports: standImports,
    providers: [ColumnsStateService],
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
    protected readonly DividerType = DividerType;
    protected readonly console = console;
    protected readonly ExtraSize = ExtraSize;
    protected readonly BadgeType = BadgeType;
    protected readonly Shape = Shape;
    protected readonly LinkAppearance = LinkAppearance;
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
    numberPickerCtrl = new FormControl(2);

  constructor(private readonly columnState: ColumnsStateService) {
    this.columnState.colsTr$.next(this.defaultCols)

  }

  protected defaultCols: IStoreTableBaseColumn[] = [
    {
      id: ExampleRowItemField.example1,
      title: '',
      order: 0,
      width: null,
      skeleton: {
        header: {
          width: '100px',
          height: '10px',
          type: 'round'
        },
        body: {
          width: '100px',
          height: '100px',
          type: 'square'
        }
      }
    },
    {
      id: ExampleRowItemField.example2,
      title: 'Порядок',
      order: 1,
      width: null,
      skeleton: {
        header: {
          width: '100px',
          height: '10px',
          type: 'square'
        },
        body: {
          width: '100px',
          height: '20px',
          type: 'square'
        }
      }
    },
    {
      id: ExampleRowItemField.example3,
      title: 'Изображение',
      order: 2,
      width: null,
      skeleton: {
        header: {
          width: '100px',
          height: '50px',
          type: 'square'
        },
        body: {
          width: '100px',
          height: '50px',
          type: 'square'
        }
      }
    },
    {
      id: ExampleRowItemField.example4,
      title: 'Баннер',
      order: 3,
      width: null,
      skeleton: {
        header: {
          width: '100px',
          height: '50px',
          type: 'square'
        },
        body: {
          width: '100px',
          height: '50px',
          type: 'square'
        }
      }
    },
    {
      id: ExampleRowItemField.example5,
      title: 'Статус',
      order: 4,
      width: null,
      skeleton: {
        header: {
          width: '100px',
          height: '50px',
          type: 'square'
        },
        body: {
          width: '100px',
          height: '50px',
          type: 'square'
        }
      }
    },
    {
      id: ExampleRowItemField.example6,
      title: 'Действие',
      order: 5,
      width: null,
      skeleton: {
        header: {
          width: '100px',
          height: '50px',
          type: 'square'
        },
        body: {
          width: '100px',
          height: '50px',
          type: 'square'
        }
      }
    }
  ]
}
