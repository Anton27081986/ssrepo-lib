import { Component, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import {
    ButtonType,
    Colors,
    ExtraSize,
    IConfirmData,
    IconPosition,
    IconType,
    IDictionaryItemDto,
    IModalData,
    LinkAppearance,
    Orientation,
    Shape,
    Status,
    TextType,
    TextWeight,
    IStoreTableBaseColumn,
} from '../../../../front-components/src/lib/shared/models';
import { standImports } from './stand.imports';
import {ColumnsStateService} from '../../../../front-components/src/lib/components';

export enum ExampleRowItemField {
  example1 = 'example1',
  example2 = 'example2',
  example3 = 'example3',
  example4 = 'example4',
  example5 = 'example5',
  example6 = 'example6',
}

import { TestModalComponent } from '../test-modal/test-modal.component';
import { ConfirmComponent } from '../../../../front-components/src/lib/components';

@Component({
    selector: 'app-stand',
    standalone: true,
    imports: standImports,
    templateUrl: './stand.component.html',
    styleUrl: './stand.component.scss'
})
export class StandComponent {
    private readonly dialog = inject(Dialog);

    protected readonly TextType = TextType;
    protected readonly TextWeight = TextWeight;
    protected readonly IconType = IconType;
    protected readonly Colors = Colors;
    protected readonly ButtonType = ButtonType;
    protected readonly IconPosition = IconPosition;
    protected readonly console = console;
    protected readonly ExtraSize = ExtraSize;
    protected readonly Shape = Shape;
    protected readonly Orientation = Orientation;
    protected readonly LinkAppearance = LinkAppearance;
    protected readonly Status = Status;
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

    openModalWithComponent(): void {
        this.dialog.open<IModalData>(TestModalComponent, {
            data: {
                title: 'Такой вот Заголовок',
                description: 'Описание',
                badgeProps: {
                    icon: IconType.Plus,
                    size: ExtraSize.xl,
                    status: Status.Error
                },
                modalConfig: {
                    headerOrientation: Orientation.Vertical
                }
            } as IModalData
        });
    }


    openConfirm(): void {
        this.dialog.open<IConfirmData>(ConfirmComponent, {
            data: {
                title: 'Выйти без сохранения?',
                description: 'Все изменения будут утеряны.',
                yes: 'Кнопка да',
                no: 'Кнопка нет',
                badgeProps: {
                    icon: IconType.Save,
                    status: Status.Error
                }
            } as IConfirmData
        });
    }

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
          type: Shape.Round
        },
        body: {
          width: '100px',
          height: '100px',
          type: Shape.Round
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
          type: Shape.Square
        },
        body: {
          width: '100px',
          height: '20px',
          type: Shape.Square
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
          type: Shape.Square
        },
        body: {
          width: '100px',
          height: '50px',
          type: Shape.Square
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
          type: Shape.Square
        },
        body: {
          width: '100px',
          height: '50px',
          type: Shape.Square
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
          type: Shape.Square
        },
        body: {
          width: '100px',
          height: '50px',
          type: Shape.Square
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
          type: Shape.Square
        },
        body: {
          width: '100px',
          height: '50px',
          type: Shape.Square
        }
      }
    }
  ]
}
