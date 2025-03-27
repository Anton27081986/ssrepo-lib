import { Component, input } from '@angular/core';
import { ModalActionApplyComponent } from '../../../lib/components/modal-action-apply/modal-action-apply.component';
import { ModalRef } from '../../../lib/shared/models';

@Component({
	selector: 'ss-lib-modal-action-apply-wrapper',
	standalone: true,
	imports: [ModalActionApplyComponent],
	template: `
		<div style="padding: 20px; background: #f3f4f6; border-radius: 8px;">
			<ss-lib-modal-action-apply
				[applyText]="applyText()"
				[applyDisabled]="applyDisabled()"
				[cancelText]="cancelText()"
				(applyEvent)="onApply()"
			></ss-lib-modal-action-apply>
		</div>
	`,
	providers: [
		{
			provide: ModalRef,
			useValue: {
				close: () => console.log('Modal closed'),
			},
		},
	],
})
export class ModalActionApplyWrapperComponent {
	applyText = input<string>('Применить');
	applyDisabled = input<boolean>(false);
	cancelText = input<string | undefined>('Отмена');

	onApply() {
		console.log('Apply clicked');
	}
}
