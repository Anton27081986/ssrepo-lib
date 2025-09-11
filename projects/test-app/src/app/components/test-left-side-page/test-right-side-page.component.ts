import { Component, inject } from '@angular/core';
import {
	ExtraSize,
	IconType,
	ModalRef,
	Shape,
	Status,
	TagType,
} from '../../../../../front-components/src/lib/shared/models';
import {
	ButtonComponent,
	RightSidePagePopupComponent,
} from '../../../../../front-components/src/lib/components';
import { TestModalData } from '../test-modal/test-modal.component';

@Component({
	selector: 'app-test-right-side-page',
	standalone: true,
	templateUrl: './test-right-side-page.component.html',
	imports: [RightSidePagePopupComponent, ButtonComponent],
})
export class TestRightSidePageComponent {
	protected readonly IconType = IconType;
	protected readonly ExtraSize = ExtraSize;
	protected readonly Shape = Shape;
	protected readonly Status = Status;

	protected readonly modalRef: ModalRef<TestModalData> = inject(
		ModalRef<TestModalData>,
	);

	protected readonly TagType = TagType;
	public close(): void {
		this.modalRef.close();
	}
}
