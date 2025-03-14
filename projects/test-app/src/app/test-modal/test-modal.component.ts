import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
	FormFieldComponent,
	InputComponent,
	ModalActionApplyComponent,
	ModalComponent,
} from '../../../../front-components/src/lib/components';
import {
	ExtraSize,
	IconType,
	ModalRef,
	Shape,
	Status,
	ToastTypeEnum,
} from '../../../../front-components/src/lib/shared/models';
import { FieldCtrlDirective } from '../../../../front-components/src/lib/core/directives';
import { ToastRef } from '../../../../front-components/src/lib/components/toast/toast-ref';
import { ToastService } from '../../../../front-components/src/lib/shared/services/toast.service';

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
	public inputCtrl = new FormControl('rrrr', [
		Validators.required,
		Validators.minLength(10),
	]);

	protected readonly IconType = IconType;
	protected readonly ExtraSize = ExtraSize;
	protected readonly Shape = Shape;
	protected readonly Status = Status;

	protected readonly modalRef: ModalRef<TestModalData> = inject(
		ModalRef<TestModalData>,
	);

	protected readonly toastService: ToastService = inject(ToastService);

	protected id: number = this.modalRef.data.id;
	protected text: string = this.modalRef.data.text;

	public onApplyEvent(): void {
		this.modalRef.submit();
	}

	public close(): void {
		this.modalRef.close();
	}

	public showToastDefault(): ToastRef {
		return this.toastService.show({
			text: 'Какой то тостик',
			type: ToastTypeEnum.Default,
		});
	}
}
