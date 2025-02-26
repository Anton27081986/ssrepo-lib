import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ModalComponent } from '../modal/modal.component';
import {
    IBadgeProps,
    IModalConfig,
    IConfirmData,
    ExtraSize,
    IconType,
    Orientation,
    ButtonType,

} from '../../shared/models';
import { ButtonComponent } from '../buttons';

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
 *     }`
 **
 * [footerRef]: TemplateRef<any> | undefined - футер модального окна.  По умолчанию: `undefined`
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
    private readonly data: IConfirmData= inject(DIALOG_DATA);

    public title = input<string>(this.data.title || 'Тестовый заголовок');
    public description = input<string | null>(this.data?.description || null);
    public badgeProps = input<IBadgeProps>(this.data?.badgeProps || {
        icon: IconType.ImagePlus,
        size: ExtraSize.lg,
    })

    public modalConfig = signal<IModalConfig>({
        headerOrientation: Orientation.Horizontal,
        showHeaderPadding: false,
        showHeaderDivider: false,
        showFooterDivider: false
    });

    public readonly ButtonType = ButtonType;
}
