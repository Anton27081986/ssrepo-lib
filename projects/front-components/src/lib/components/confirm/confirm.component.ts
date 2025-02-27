import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ButtonComponent } from '../buttons';
import { ModalComponent } from '../modal/modal.component';
import {
    IModalConfig,
    IConfirmData,
    ExtraSize,
    IconType,
    Orientation,
    ButtonType,
    Shape,
    Status,
} from '../../shared/models';

/**
 * Параметры:
 *
 * confirmData - IConfirmData. Данные по умолчанию: `{
 *         description: '',
 *         badgeProps: {
 *             icon: IconType.ImagePlus,
 *             size: ExtraSize.lg,
 *             shape: Shape.Square,
 *             status: Status.Default
 *         },
 *         yes: 'Да',
 *         no: 'Нет',
 *     }`,
 */
@Component({
    selector: 'ss-lib-confirm',
    standalone: true,
    imports: [
        ModalComponent,
        ButtonComponent,
    ],
    templateUrl: './confirm.component.html',
    styleUrl: './confirm.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmComponent {
    protected readonly dialogRef = inject(DialogRef);
    private readonly data: IConfirmData = inject(DIALOG_DATA);

    public confirmData = signal<IConfirmData>({
        title: this.data.title,
        description: this.data?.description ?? '',
        badgeProps: {
            icon: this.data.badgeProps?.icon ?? IconType.ImagePlus,
            size: this.data.badgeProps?.size ?? ExtraSize.lg,
            shape: this.data.badgeProps?.shape ?? Shape.Square,
            status: this.data.badgeProps?.status ?? Status.Default
        },
        yes: this.data.yes ?? 'Да',
        no: this.data.no ?? 'Нет',
    });

    public modalConfig = signal<IModalConfig>({
        headerOrientation: Orientation.Horizontal,
        showHeaderPadding: false,
        showHeaderDivider: false,
        showFooterDivider: false
    });

    public readonly ButtonType = ButtonType;
}
