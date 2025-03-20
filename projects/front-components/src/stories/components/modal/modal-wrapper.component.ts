import { Component, input, TemplateRef } from '@angular/core';
import { ModalComponent } from '../../../lib/components/modal/modal.component';
import {
	IBadgeProps,
	IconType,
	Shape,
	Status,
} from '../../../lib/shared/models';

@Component({
	selector: 'ss-lib-modal-wrapper',
	standalone: true,
	imports: [ModalComponent],
	template: `
		<ss-lib-modal
			[titleHeader]="titleHeader()"
			[descriptionHeader]="descriptionHeader()"
			[actionsRef]="actionsRef()"
			[contentRef]="contentRef()"
			[badgeProps]="badgeProps()"
		></ss-lib-modal>
	`,
})
export class ModalWrapperComponent {
	titleHeader = input.required<string>();
	descriptionHeader = input.required<string>();
	actionsRef = input.required<TemplateRef<{}> | null>();
	contentRef = input<TemplateRef<{}> | null>(null);
	badgeProps = input.required<IBadgeProps>();
}
