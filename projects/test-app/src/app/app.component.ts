import { Component } from '@angular/core';
import { appImports } from './app.imports';
import {
    ButtonType,
    Colors,
    IconType,
    TextType,
    TextWeight,
    IconPosition,
    Size
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

    toggleCtrl = new FormControl(false);

    inputCtrl = new FormControl('rrrr', [Validators.required, Validators.minLength(10)]);
    // inputCtrl = new FormControl({value: '', disabled: true});
}
