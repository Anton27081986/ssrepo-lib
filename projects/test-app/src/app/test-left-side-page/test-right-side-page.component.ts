import { Component, inject } from '@angular/core';
import {
	ExtraSize,
	IconType,
	ModalRef,
	Shape,
	Status,
} from '../../../../front-components/src/lib/shared/models';
import {
	ModalActionApplyComponent,
	RightSidePagePopupComponent,
} from '../../../../front-components/src/lib/components';
import { TestModalData } from '../test-modal/test-modal.component';

@Component({
	selector: 'app-test-right-side-page',
	standalone: true,
	templateUrl: './test-right-side-page.component.html',
	styleUrl: './test-right-side-page.component.scss',
	imports: [RightSidePagePopupComponent, ModalActionApplyComponent],
})
export class TestRightSidePageComponent {
	protected readonly IconType = IconType;
	protected readonly ExtraSize = ExtraSize;
	protected readonly Shape = Shape;
	protected readonly Status = Status;

	protected readonly modalRef: ModalRef<TestModalData> = inject(
		ModalRef<TestModalData>,
	);

	public close(): void {
		this.modalRef.close();
	}
}
