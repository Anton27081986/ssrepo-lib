import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ButtonComponent } from '../../../../../front-components/src/lib/components';
import {
	ButtonType,
	ExtraSize,
	IconType,
	Shape,
	Status,
} from '../../../../../front-components/src/lib/shared/models';
import {
	TestModalComponent,
	TestModalData,
} from '../../test-modal/test-modal.component';
import { SharedPopupService } from '../../../../../front-components/src/lib/shared/services';

@Component({
	selector: 'app-modal-triggers-demo',
	standalone: true,
	template: ` <div class="section">
		<h2 class="section-title">Modal Triggers</h2>
		<p class="section-description">
			Buttons to trigger different types of modals.
		</p>
		<div class="component-row">
			<ss-lib-button
				[type]="ButtonType.Primary"
				[text]="'Модалка - компонент'"
				(click)="openTestModal()"
			></ss-lib-button>

			<ss-lib-button
				[type]="ButtonType.Primary"
				[text]="'Модалка - confirm'"
				(click)="openTestConfirmModal()"
			></ss-lib-button>

			<ss-lib-button
				[type]="ButtonType.Primary"
				[text]="'Модалка - light-box'"
				(click)="openLightBoxModal()"
			></ss-lib-button>
		</div>
	</div>`,
	styles: [``],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ButtonComponent],
})
export class ModalTriggersDemoComponent {
	private readonly sharedPopupService = inject(SharedPopupService);

	protected readonly ButtonType = ButtonType;

	public openTestModal(): void {
		const popover = this.sharedPopupService.openModal<TestModalData>(
			TestModalComponent,
			{
				id: 1,
				text: 'Какой то текст',
			},
			true,
			'820px',
		);

		popover.afterClosed$.subscribe((item) =>
			// eslint-disable-next-line no-console
			console.log(item, 'afterClosed$'),
		);
		popover.afterSubmit$.subscribe((item) =>
			// eslint-disable-next-line no-console
			console.log(item, 'afterSubmit$'),
		);
	}

	public openTestConfirmModal(): void {
		const popover = this.sharedPopupService.openConfirmModal({
			title: 'Выйти без сохранения?',
			description: 'Все изменения будут утеряны',
			badgeProps: {
				icon: IconType.ImagePlus,
				size: ExtraSize.lg,
				shape: Shape.Square,
				status: Status.Default,
			},
			apply: {
				text: 'Выйти',
				onSubmit: () => this.submit(),
			},
			cancelText: 'Остаться',
		});

		// eslint-disable-next-line no-console
		popover.afterSubmit$.subscribe((item) => console.log(item));

		// eslint-disable-next-line no-console
		popover.afterClosed$.subscribe((item) => console.log(item));
	}

	public openLightBoxModal(): void {
		const popover = this.sharedPopupService.openLightBoxModal({
			src: 'https://i.pravatar.cc/300',
			width: 1280,
			height: 400,
		});

		// eslint-disable-next-line no-console
		popover.afterClosed$.subscribe((item) => console.log(item));
	}

	public submit(): Observable<unknown> {
		return of([]);
	}
}
