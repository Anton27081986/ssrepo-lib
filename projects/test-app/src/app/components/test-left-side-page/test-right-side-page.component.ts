import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
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
	FormFieldComponent,
	InputComponent,
	RightSidePagePopupComponent,
} from '../../../../../front-components/src/lib/components';
import { TestModalData } from '../test-modal/test-modal.component';
import { FieldCtrlDirective } from '../../../../../front-components/src/lib/core/directives';

@Component({
	selector: 'app-test-right-side-page',
	standalone: true,
	templateUrl: './test-right-side-page.component.html',
	imports: [
		RightSidePagePopupComponent,
		ButtonComponent,
		InputComponent,
		FieldCtrlDirective,
		FormFieldComponent,
		ReactiveFormsModule,
	],
})
export class TestRightSidePageComponent {
	protected readonly IconType = IconType;
	protected readonly ExtraSize = ExtraSize;
	protected readonly Shape = Shape;
	protected readonly Status = Status;

	public inputCtrl = new FormControl('rrrr', [
		Validators.required,
		Validators.minLength(10),
	]);

	protected readonly modalRef: ModalRef<TestModalData> = inject(
		ModalRef<TestModalData>,
	);

	protected readonly TagType = TagType;
	public close(): void {
		this.modalRef.close();
	}
}
