import type { InputSignal, TemplateRef } from '@angular/core';
import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
} from '@angular/core';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import type { IBadgeProps } from '../../shared/models';
import { ModalRef } from '../../shared/models';
import { BadgeInfoComponent } from '../badge-info/badge-info.component';
import { DividerComponent } from '../divider/divider.component';

@Component({
	selector: 'ss-lib-modal',
	standalone: true,
	imports: [NgIf, BadgeInfoComponent, DividerComponent, NgTemplateOutlet],
	templateUrl: './modal.component.html',
	styleUrl: './modal.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
	public titleHeader: InputSignal<string> = input.required<string>();
	public descriptionHeader: InputSignal<string> = input.required<string>();
	public actionsRef: InputSignal<TemplateRef<{}> | null> = input.required();

	public contentRef: InputSignal<TemplateRef<{}> | null> =
		input<TemplateRef<{}> | null>(null);

	public badgeProps: InputSignal<IBadgeProps> = input.required<IBadgeProps>();
	private readonly popoverRef = inject(ModalRef);

	public onCloseEvent(): void {
		this.popoverRef.close();
	}
}
