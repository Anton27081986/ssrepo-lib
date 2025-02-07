import {
    ButtonComponent,
    IconComponent,
    TextComponent,
    ToggleComponent,
    ToggleIconComponent,
    FormFieldComponent,
    InputComponent,
    TextareaComponent,
} from '../../../front-components/src/lib/components';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldCtrlDirective } from '../../../front-components/src/lib/core/directives';

export const appImports = [
    ReactiveFormsModule,
    IconComponent,
    TextComponent,
    ButtonComponent,
    ToggleComponent,
    ToggleIconComponent,
    FormFieldComponent,
    FieldCtrlDirective,
    InputComponent,
    TextareaComponent
]