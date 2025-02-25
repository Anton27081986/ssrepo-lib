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
    private readonly data: IModalData = inject(DIALOG_DATA);

    public title = input<string>(this.data.title);
    public description = input<string | null>(this.data?.description || null);
    public icon = input<IconType | null>(this.data?.icon ||null);
    public contentRef = input<TemplateRef<any> | undefined>(this.data?.contentRef || undefined);
    public footerRef = input<TemplateRef<any> | undefined>(this.data?.footerRef || undefined);
    public modalConfig = input<IModalConfig>(this.data.modalConfig || {
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
