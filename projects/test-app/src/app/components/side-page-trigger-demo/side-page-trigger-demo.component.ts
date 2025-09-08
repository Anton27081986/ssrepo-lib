import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../../../front-components/src/lib/components';
import { ButtonType } from '../../../../../front-components/src/lib/shared/models';
import type { TestModalData } from '../test-modal/test-modal.component';
import { TestRightSidePageComponent } from '../test-left-side-page/test-right-side-page.component';
import { SharedPopupService } from '../../../../../front-components/src/lib/shared/services';

@Component({
	selector: 'app-side-page-trigger-demo',
	standalone: true,
	template: ` <div class="section">
		<h2 class="section-title">Side Page Triggers</h2>

		<p class="section-description">
			Buttons to trigger different types of Side Page.
		</p>

		<div class="component-row">
			<ss-lib-button
				[type]="ButtonType.Primary"
				[text]="'Модалка - side-page c footer'"
				(click)="openRightSidebar(true, true)"
			></ss-lib-button>

			<ss-lib-button
				[type]="ButtonType.Primary"
				[text]="'Модалка - side-page c backdrop'"
				(click)="openRightSidebar(true, true)"
			></ss-lib-button>

			<ss-lib-button
				[type]="ButtonType.Primary"
				[text]="'Модалка - side-page без overlay'"
				(click)="openRightSidebar(false, true)"
			></ss-lib-button>

			<ss-lib-button
				[type]="ButtonType.Primary"
				[text]="'Модалка - side-page без footer'"
				(click)="openRightSidebar(true, false)"
			></ss-lib-button>
		</div>
	</div>`,
	styles: [``],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ButtonComponent],
})
export class SidePageTriggerDemoComponent {
	private readonly sharedPopupService = inject(SharedPopupService);

	protected readonly ButtonType = ButtonType;

	public openRightSidebar(hasBackdrop: boolean, isFooter: boolean): void {
		this.sharedPopupService.openRightSidePage<TestModalData>(
			TestRightSidePageComponent,
			{ id: 0, text: 'Какой то текст', isFooter },
			'645px',
			hasBackdrop,
			true,
		);
	}
}
