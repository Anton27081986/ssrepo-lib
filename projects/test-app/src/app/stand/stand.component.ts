import { Component, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
	ToastTypeEnum,
	TooltipPosition,
} from '../../../../front-components/src/lib/shared/models';
import { standImports } from './stand.imports';
import { ColumnsStateService } from '../../../../front-components/src/lib/components';
import { DEFAULT_COLS, DROPDOWN_ITEMS } from './constants';
import { SharedPopupService } from '../../../../front-components/src/lib/shared/services';
import type { TestModalData } from '../test-modal/test-modal.component';
import { TestModalComponent } from '../test-modal/test-modal.component';
import { ToastRef } from '../../../../front-components/src/lib/components';
import { DataTimeRange } from '../../../../front-components/src/lib/shared/models/interfaces/data-time-range';

@Component({
	selector: 'app-stand',
	standalone: true,
	imports: [standImports],
	providers: [ColumnsStateService],
	templateUrl: './stand.component.html',
	styleUrl: './stand.component.scss',
})
export class StandComponent {
	public imgCtrl = new FormControl(null);

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

	public datepickerCtrl: FormControl<Date | null> = new FormControl(
		new Date('2025-03-17T09:42:01.028Z'),
	);

	public minDate = new Date(new Date());

	public timepickerCtrl = new FormControl(null);
	public dateTimepickerCtrl: FormControl<Date | null> = new FormControl(
		new Date(),
	);

	public dateTimepickerStrCtrl: FormControl<Date | null> = new FormControl(
		new Date('2025-03-17T09:42:01.0285Z'),
		[Validators.required],
	);

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
	protected readonly dropdownItems = DROPDOWN_ITEMS;
	protected readonly TooltipPosition = TooltipPosition;

	protected readonly dataRange: FormControl<DataTimeRange | null> =
		new FormControl<DataTimeRange | null>(null);

	private readonly sharedPopupService = inject(SharedPopupService);

	constructor(
		private readonly columnState: ColumnsStateService,
		private readonly http: HttpClient,
	) {
		this.columnState.colsTr$.next(DEFAULT_COLS);

		this.dataRange.setValue({
			start: new Date('2025-03-20T09:42:01.0285Z'),
			end: new Date('2025-03-30T09:42:01.0285Z'),
		});
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
			// eslint-disable-next-line no-console
			console.log(item, 'afterClosed$'),
		);
		popover.afterSubmit$.subscribe((item) =>
			// eslint-disable-next-line no-console
			console.log(item, 'afterSubmit$'),
		);
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

		// eslint-disable-next-line no-console
		popover.afterSubmit$.subscribe((item) => console.log(item));

		// eslint-disable-next-line no-console
		popover.afterClosed$.subscribe((item) => console.log(item));
	}

	public submit(): Observable<unknown> {
		return of([]);
	}

	public showToastDefault(): ToastRef {
		return this.sharedPopupService.openToast({
			text: 'Какой то тостик',
			type: ToastTypeEnum.Default,
		});
	}

	public showToastError(): ToastRef {
		return this.sharedPopupService.openToast({
			text: 'Какой то тостик',
			type: ToastTypeEnum.Error,
		});
	}

	public showToastSuccess(): ToastRef {
		return this.sharedPopupService.openToast({
			text:
				'Какой то тостик Какой то тостик Какой то тостик Какой то тостик ' +
				'Какой то тостик Какой то тостик Какой то тостикКакой то тостик',
			type: ToastTypeEnum.Success,
		});
	}

	public viewToastSuccess(): unknown {
		return (
			this.http
				.post('https://reqres.in/api/users?page=2', {
					email: 'eve.holt@reqres.in',
					password: 'pistol',
				})
				// eslint-disable-next-line no-console
				.subscribe((item) => console.log(item))
		);
	}

	public exampleMetod(params: { email: string }): void {
		this.http
			.post('https://reqres.in/api/register', params)
			.pipe(
				catchError(() => {
					this.sharedPopupService.openToast({
						text:
							'Какой то тостик Какой то тостик Какой то тостик ' +
							'Какой то тостик Какой то тостик Какой то тостик Какой то тостик Какой то тостик',
						type: ToastTypeEnum.Error,
						mainButton: {
							text: 'Попробовать снова',
							click: () => this.exampleMetod(params),
						},
						secondaryButton: {
							text: 'Попробовать еще',
							// eslint-disable-next-line no-console
							click: () => console.log('secondary Button'),
						},
					});

					return of([]);
				}),
			)
			.subscribe();
	}
}
