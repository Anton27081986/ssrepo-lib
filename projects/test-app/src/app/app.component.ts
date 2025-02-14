import { Component } from '@angular/core';
import { appImports } from './app.imports';
import {
    ButtonType,
    Colors,
    IconType,
    TextType,
    TextWeight,
    IconPosition,
    Size, IDictionaryItemDto
} from '../../../front-components/src/lib/shared/models';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [appImports],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
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

    numberPickerCtrl = new FormControl(2);
}
