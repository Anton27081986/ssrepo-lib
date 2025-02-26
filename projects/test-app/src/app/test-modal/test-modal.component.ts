import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { IModalConfig, IModalData, Orientation, IconType } from '../../../../front-components/src/lib/shared/models';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ModalComponent } from '../../../../front-components/src/lib/components';

@Component({
    selector: 'app-test-modal',
    standalone: true,
    imports: [ModalComponent],
    templateUrl: './test-modal.component.html',
    styleUrl: './test-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestModalComponent {
    private readonly data: IModalData = inject(DIALOG_DATA);

    public title = input<string>(this.data.title || 'Тестовый заголовок');
    public description = input<string | null>(this.data?.description || null);
    public icon = input<IconType | null>(this.data?.icon || null);
    public modalConfig = input<IModalConfig>(this.data.modalConfig || {
        headerOrientation: Orientation.Horizontal,
        showHeaderPadding: true,
        showHeaderDivider: true,
        showFooterDivider: true
    });
}
