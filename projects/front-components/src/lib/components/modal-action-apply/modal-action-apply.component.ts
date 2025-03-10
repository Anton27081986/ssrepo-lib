import type { InputSignal } from '@angular/core';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { ModalRef } from '../../shared/models';
import { ButtonType } from '../../shared/models';
import { ButtonComponent } from '../buttons';

@Component({
	selector: 'ss-lib-modal-action-apply',
	standalone: true,
	imports: [ButtonComponent, NgIf],
	templateUrl: './modal-action-apply.component.html',
	styleUrl: './modal-action-apply.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalActionApplyComponent {
	public applyText: InputSignal<string> = input.required<string>();
	public applyDisabled: InputSignal<boolean> = input<boolean>(false);
	public cancelText: InputSignal<string | undefined> = input<
		string | undefined
	>();

	public onApply = output<void>();

	constructor(private readonly modalRef: ModalRef) {}

	public close() {
		this.modalRef.close();
	}

	public readonly buttonType = ButtonType;
}
