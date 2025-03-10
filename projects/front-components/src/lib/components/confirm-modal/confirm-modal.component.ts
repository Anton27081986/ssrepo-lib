import type { OnDestroy } from '@angular/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';
import type {
	IApply,
	IBadgeProps,
	IConfirmData,
	ModalRef,
} from '../../shared/models';
import { ButtonType } from '../../shared/models';
import { ModalActionApplyComponent } from '../modal-action-apply/modal-action-apply.component';

@Component({
	selector: 'ss-lib-confirm-modal',
	standalone: true,
	imports: [ModalComponent, ModalActionApplyComponent],
	templateUrl: './confirm-modal.component.html',
	styleUrl: './confirm-modal.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmModalComponent implements OnDestroy {
	protected applyText: IApply;
	protected titleHeader: string;
	protected descriptionHeader: string;
	protected applyDisabled: boolean;
	protected badgeProps: IBadgeProps;
	protected cancelText: string | undefined;
	private readonly subscription: Subscription = new Subscription();

	constructor(private readonly modalRef: ModalRef<IConfirmData>) {
		this.applyText = this.modalRef.data.apply;
		this.applyDisabled = false;
		this.badgeProps = this.modalRef.data.badgeProps;
		this.cancelText = this.modalRef.data.cancelText;
		this.titleHeader = this.modalRef.data.title;
		this.descriptionHeader = this.modalRef.data.description;
	}

	protected submit() {
		if (this.modalRef.data.apply.onSubmit) {
			this.subscription.add(
				this.modalRef.data.apply.onSubmit().subscribe(() => {
					this.modalRef.submit();
					this.modalRef.close();
				}),
			);
		} else {
			this.modalRef.submit();
			this.modalRef.close();
		}
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	public readonly ButtonType = ButtonType;
}
