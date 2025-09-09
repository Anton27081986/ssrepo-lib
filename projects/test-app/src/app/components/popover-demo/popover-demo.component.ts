import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	inject,
	viewChild,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import {
	ButtonComponent,
	ConfirmModalComponent,
} from '../../../../../front-components/src/lib/components';
import { ButtonType } from '../../../../../front-components/src/lib/shared/models';
import { SharedPopupService } from '../../../../../front-components/src/lib/shared/services';

@Component({
	selector: 'app-popover-demo',
	standalone: true,
	template: ` <div class="section">
		<h2 class="section-title">Popover with element binding Triggers</h2>

		<p class="section-description">
			Buttons to trigger different types of Popover with element binding.
		</p>

		<div class="component-row">
			<ss-lib-button
				#popoverBtn
				[type]="ButtonType.Primary"
				[text]="'Поповер'"
				(click)="openPopover()"
			></ss-lib-button>
		</div>
	</div>`,
	imports: [ButtonComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverDemoComponent {
	private readonly sharedPopupService = inject(SharedPopupService);

	public readonly popoverBtnElement = viewChild('popoverBtn', {
		read: ElementRef,
	});

	protected readonly ButtonType = ButtonType;

	public openPopover(): void {
		this.sharedPopupService.openPopover(
			this.popoverBtnElement()!.nativeElement,
			ConfirmModalComponent,
			{
				title: 'string',
				description: 'string',
				apply: {
					text: 'string',
					onSubmit: () => this.submit(),
				},
				cancelText: 'string',
			},
			'300px',
			true,
			false,
			false,
		);
	}

	public submit(): Observable<unknown> {
		return of([]);
	}
}
