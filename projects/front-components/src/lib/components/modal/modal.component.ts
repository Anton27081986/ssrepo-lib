import { ChangeDetectionStrategy, Component, inject, input, TemplateRef } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import {
    ButtonType,
    ExtraSize,
    IconType,
    IModalConfig,
    IModalData,
    Orientation,
    Colors,
    TextType,
    TextWeight
} from '../../shared/models';
import { modalImports } from './modal.imports';

@Component({
    selector: 'ss-lib-modal',
    standalone: true,
    imports: [modalImports],
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
    protected readonly dialogRef = inject(DialogRef);

    public title = input.required<string>();
    public description = input<string | null>(null);
    public icon = input<IconType | null>(null);
    public contentRef = input<TemplateRef<any> | undefined>(undefined);
    public footerRef = input<TemplateRef<any> | undefined>(undefined);
    public modalConfig = input<IModalConfig>({
        headerOrientation: Orientation.Horizontal,
        showHeaderPadding: true,
        showHeaderDivider: true,
        showFooterDivider: true
    });

    public readonly ButtonType = ButtonType;
    public readonly ExtraSize = ExtraSize;
    public readonly IconType = IconType;
    public readonly TextType = TextType;
    public readonly TextWeight = TextWeight;
    public readonly Colors = Colors;
}
