import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import {
    ButtonType,
    Colors,
    ExtraSize,
    IconType,
    IModalData,
    Orientation,
    TextType,
    TextWeight
} from '../../shared/models';
import { modalImports } from './modal.imports';


/**
 * Параметры:
 *
 * [modalData]: IModalData. По умолчанию: `
 *  badgeProps: {
 *      icon: IconType.ImagePlus,
 *      size: ExtraSize.lg,
 *      headerOrientation: Orientation.Horizontal,
 *      showHeaderPadding: true,
 *      showHeaderDivider: true,
 *      showFooterDivider: true
 * },`
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

    public modalData = input.required<IModalData, IModalData>({
        transform: this.setDefaultProps
    });

    public setDefaultProps(modalData: IModalData): IModalData {
        return {
            ...modalData,
            badgeProps: {
                ...modalData.badgeProps,
                icon: modalData.badgeProps?.icon ?? IconType.ImagePlus,
                size: modalData.badgeProps?.size ?? ExtraSize.lg
            },
            modalConfig: {
                ...modalData.modalConfig,
                headerOrientation: modalData.modalConfig?.headerOrientation ?? Orientation.Horizontal,
                showHeaderPadding: modalData.modalConfig?.showHeaderPadding ?? true,
                showHeaderDivider: modalData.modalConfig?.showHeaderDivider ?? true,
                showFooterDivider: modalData.modalConfig?.showFooterDivider ?? true,
            }
        };
    }

    public readonly ButtonType = ButtonType;
    public readonly ExtraSize = ExtraSize;
    public readonly IconType = IconType;
    public readonly TextType = TextType;
    public readonly TextWeight = TextWeight;
    public readonly Colors = Colors;
}
