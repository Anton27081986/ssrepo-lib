import { Component, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import {
    ButtonType,
    Colors, ExtraSize,
    IconPosition,
    IconType,
    IDictionaryItemDto,
    IModalData,
    LinkAppearance,
    Orientation,
    Shape,
    TextType,
    TextWeight
} from '../../../../front-components/src/lib/shared/models';
import { standImports } from './stand.imports';
import { TestModalComponent } from '../test-modal/test-modal.component';

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
            } as IModalData
        });
    }
}
