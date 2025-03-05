import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import {
    IModalData,
} from '../../../../front-components/src/lib/shared/models';
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
    protected readonly data: IModalData = inject(DIALOG_DATA);
}
