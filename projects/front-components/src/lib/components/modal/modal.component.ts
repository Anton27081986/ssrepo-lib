import { ChangeDetectionStrategy, Component, inject, input, TemplateRef } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import {
    ButtonType,
    Colors,
    ExtraSize,
    IBadgeProps,
    IconType,
    IModalConfig,
    Orientation,
    TextType,
    TextWeight
} from '../../shared/models';
import { modalImports } from './modal.imports';


/**
 * Параметры:
 *
 * [title]: string - заголовок модального окна. Обязательное поле
 *
 * [description]: string | null - описание модального окна. По умолчанию: `null`
 *
 * [badgeProps]: IBadgeProps - бейдж модального окна. По умолчанию: `{
 *         icon: IconType.ImagePlus,
 *         size: ExtraSize.lg,
 *         iconColor: Colors.IconPrimary,
 *         borderColor: Colors.BorderPrimary
 *     }`
 *
 * [contentRef]: TemplateRef<any> | undefined - контент модального окна. По умолчанию: `undefined`
 *
 * [footerRef]: TemplateRef<any> | undefined - футер модального окна.  По умолчанию: `undefined`
 *
 * [modalConfig]: IModalConfig - конфиг. По умолчанию: `
 * {
 *      headerOrientation: Orientation.Horizontal,
 *      showHeaderPadding: true,
 *      showHeaderDivider: true,
 *      showFooterDivider: true
 * }`
 */
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
    public badgeProps = input<IBadgeProps>({
        icon: IconType.ImagePlus,
        size: ExtraSize.lg,
        iconColor: Colors.IconPrimary,
        borderColor: Colors.BorderPrimary
    });
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
