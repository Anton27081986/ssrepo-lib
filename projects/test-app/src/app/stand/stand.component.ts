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
    IModalData,
    LinkAppearance,
    Orientation,
    Shape,
    Status,
    TextType,
    TextWeight, TooltipPosition,
} from '../../../../front-components/src/lib/shared/models';
import { standImports } from './stand.imports';
import { ColumnsStateService, ConfirmComponent } from '../../../../front-components/src/lib/components';
import { TestModalComponent } from '../test-modal/test-modal.component';
import { DROPDOWN_ITEMS, DEFAULT_COLS } from './constants';

@Component({
    selector: 'app-stand',
    standalone: true,
    imports: [standImports],
    providers: [ColumnsStateService],
    templateUrl: './stand.component.html',
    styleUrl: './stand.component.scss'
})
export class StandComponent {
    private readonly dialog = inject(Dialog);

    toggleCtrl = new FormControl(false);
    inputCtrl = new FormControl('rrrr', [Validators.required, Validators.minLength(10)]);
    textareaCtrl = new FormControl('rrrr', [Validators.required, Validators.minLength(10)]);
    selectCtrl = new FormControl(null);
    numberPickerCtrl = new FormControl(2);

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
    protected readonly DROPDOWN_ITEMS = DROPDOWN_ITEMS;
    protected readonly TooltipPosition = TooltipPosition;

    constructor(private readonly columnState: ColumnsStateService) {
        this.columnState.colsTr$.next(DEFAULT_COLS)
    }

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
}
