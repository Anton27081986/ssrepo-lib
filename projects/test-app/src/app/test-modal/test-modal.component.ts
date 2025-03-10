import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
	FormFieldComponent,
	InputComponent,
	ModalActionApplyComponent,
	ModalComponent,
	TextareaComponent,
} from '../../../../front-components/src/lib/components';
import {
	ExtraSize,
	IconType,
	Shape,
	Status,
} from '../../../../front-components/src/lib/shared/models';
import { ModalRef } from '../../../../front-components/src/lib/shared/models/utils/modal.ref';
import { FieldCtrlDirective } from '../../../../front-components/src/lib/core/directives';

export interface TestModalData {
	id: number;
	text: string;
}

@Component({
	selector: 'app-test-modal',
	standalone: true,
	imports: [
		ModalComponent,
		ModalActionApplyComponent,
		InputComponent,
		FieldCtrlDirective,
		FormFieldComponent,
		ReactiveFormsModule,
	],
	templateUrl: './test-modal.component.html',
	styleUrl: './test-modal.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestModalComponent {
	protected readonly IconType = IconType;
	protected readonly ExtraSize = ExtraSize;
	protected readonly Shape = Shape;
	protected readonly Status = Status;

	inputCtrl = new FormControl('rrrr', [
		Validators.required,
		Validators.minLength(10),
	]);

	protected readonly modalRef: ModalRef<TestModalData> = inject(
		ModalRef<TestModalData>,
	);

	protected id: number = this.modalRef.data.id;
	protected text: string = this.modalRef.data.text;

	apply() {
		this.modalRef.submit();
	}

	close() {
		this.modalRef.close();
	}
}
