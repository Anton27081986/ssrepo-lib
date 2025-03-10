import { Component, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import type { Observable } from 'rxjs';
import { of } from 'rxjs';
import {
	ButtonType,
	Colors,
	ExtraSize,
	IconPosition,
	IconType,
	LinkAppearance,
	Orientation,
	Shape,
	Status,
	TextType,
	TextWeight,
	TooltipPosition,
} from '../../../../front-components/src/lib/shared/models';
import { standImports } from './stand.imports';
import { ColumnsStateService } from '../../../../front-components/src/lib/components';
import { DROPDOWN_ITEMS, DEFAULT_COLS } from './constants';
import { SharedPopupService } from '../../../../front-components/src/lib/shared/services';
import type { TestModalData } from '../test-modal/test-modal.component';
import { TestModalComponent } from '../test-modal/test-modal.component';

@Component({
	selector: 'app-stand',
	standalone: true,
	imports: [standImports],
	providers: [ColumnsStateService],
	templateUrl: './stand.component.html',
	styleUrl: './stand.component.scss',
})
export class StandComponent {
	public toggleCtrl = new FormControl(false);
	public inputCtrl = new FormControl('rrrr', [
		Validators.required,
		Validators.minLength(10),
	]);

	public textareaCtrl = new FormControl('rrrr', [
		Validators.required,
		Validators.minLength(10),
	]);

	public selectCtrl = new FormControl(null);
	public numberPickerCtrl = new FormControl(2);

	public datepickerCtrl = new FormControl(null);
	public minDate = new Date(2025, 2, 5);
	public maxDate = new Date(2025, 2, 20);

	protected readonly TextType = TextType;
	protected readonly TextWeight = TextWeight;
	protected readonly IconType = IconType;
	protected readonly Colors = Colors;
	protected readonly ButtonType = ButtonType;
	protected readonly IconPosition = IconPosition;
	protected readonly console = console;
	protected readonly ExtraSize = ExtraSize;
	protected readonly Shape = Shape;
	protected readonly Orientation = Orientation;
	protected readonly LinkAppearance = LinkAppearance;
	protected readonly Status = Status;
	protected readonly DROPDOWN_ITEMS = DROPDOWN_ITEMS;
	protected readonly TooltipPosition = TooltipPosition;

	private readonly sharedPopupService = inject(SharedPopupService);

	constructor(private readonly columnState: ColumnsStateService) {
		this.columnState.colsTr$.next(DEFAULT_COLS);
	}

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
			console.log(item, 'afterClosed$'),
		);
		popover.afterSubmit$.subscribe((item) =>
			console.log(item, 'afterSubmit$'),
		);
	}

	public openLightBoxModal(): void {
		const popover = this.sharedPopupService.openLightBoxModal({
			src: 'https://i.pravatar.cc/300',
			width: 1280,
			height: 400,
		});

		popover.afterClosed$.subscribe((item) => console.log(item));
	}

	public openTestConfirmModal(): void {
		const popover = this.sharedPopupService.openConfirmModal({
			title: 'Какой то title',
			description: 'Какой то description',
			badgeProps: {
				icon: IconType.ImagePlus,
				size: ExtraSize.lg,
				shape: Shape.Square,
				status: Status.Default,
			},
			apply: {
				text: 'Ок',
				onSubmit: () => this.submit(),
			},
			cancelText: 'не ок',
		});

		popover.afterSubmit$.subscribe((item) => console.log(item));

		popover.afterClosed$.subscribe((item) => console.log(item));
	}

	public submit(): Observable<any> {
		return of([]);
	}
}
