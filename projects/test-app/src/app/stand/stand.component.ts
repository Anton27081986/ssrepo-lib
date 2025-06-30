import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { catchError, Observable, of, Subscription } from 'rxjs';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import {
	ButtonType,
	Colors,
	ExtraSize,
	HintType,
	IconPosition,
	IconType,
	JustifyContent,
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
import { BANNERS_ITEMS, DEFAULT_COLS, DROPDOWN_ITEMS } from './constants';
import { SharedPopupService } from '../../../../front-components/src/lib/shared/services';
import type { TestModalData } from '../test-modal/test-modal.component';
import { TestModalComponent } from '../test-modal/test-modal.component';
import { ToastRef } from '../../../../front-components/src/lib/components';
import { exampleDataTable } from './constants/example-data-table';
import { TestRightSidePageComponent } from '../test-left-side-page/test-right-side-page.component';
import { Tab } from '../../../../front-components/src/lib/shared/models/interfaces/tab';
import { TableOperPlanExampleComponent } from '../table-oper-plan-example/table-oper-plan-example.component';

@Component({
	selector: 'app-stand',
	standalone: true,
	imports: [...standImports, TableOperPlanExampleComponent],
	providers: [ColumnsStateService, RouterOutlet],
	templateUrl: './stand.component.html',
	styleUrl: './stand.component.scss',
})
export class StandComponent {
	public offset: WritableSignal<number> = signal(0);

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

	public indexTab = 0;

	public selectCtrl = new FormControl(null);
	public numberPickerCtrl = new FormControl(2);

	public datepickerCtrl: FormControl<Date | null> = new FormControl(
		new Date('2025-03-17T09:42:01.028Z'),
	);

	public minDate = new Date(2025, 2, 5);
	public maxDate = new Date(2025, 2, 20);

	public timepickerCtrl = new FormControl(null);
	public dateTimepickerCtrl: FormControl<Date | null> = new FormControl(
		new Date(),
	);

	public checkBox1 = new FormControl(null);
	public checkBox2 = new FormControl(null);
	public checkBox3 = new FormControl(true);

	public otpCtrl = new FormControl('');

	public fileLoadProgress = signal<number>(0);
	public fileLoadSubscription?: Subscription;

	public carouselIndex = signal(0);

	public indeterminate = false;

	public tabs: Tab[] = [
		{
			text: 'Таб1 и еще табиков много',
			isVisible: true,
			isDisabled: false,
		},
		{
			text: 'Таб2',
			isVisible: true,
			isDisabled: false,
		},
		{
			text: 'Таб3',
			isVisible: true,
			isDisabled: true,
		},
		{
			text: 'Таб4',
			isVisible: false,
			isDisabled: false,
		},
		{
			text: 'Таб5',
			isVisible: true,
			isDisabled: false,
		},
		{
			text: 'Таб6',
			isVisible: true,
			isDisabled: false,
		},
	];

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
	protected readonly exampleItems = exampleDataTable;
	protected readonly bannersItems = BANNERS_ITEMS;

	private readonly sharedPopupService = inject(SharedPopupService);

	protected readonly JustifyContent = JustifyContent;
	protected readonly HelpHintType = HintType;
	constructor(
		private readonly columnState: ColumnsStateService,
		private readonly http: HttpClient,
	) {
		this.columnState.colsTr$.next(DEFAULT_COLS);

		this.checkBox2.disable();

		this.checkBox3.disable();
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

	public uploadFile(file: File | null): void {
		if (file) {
			this.fileLoadProgress.set(0);
			const formData = new FormData();

			formData.append('file', file);

			this.fileLoadSubscription = this.http
				.post<{ url: string }>(
					`https://erp-dev.ssnab.it/api/files/fileStorage/2/upload`,
					formData,
					{
						reportProgress: true,
						observe: 'events',
						headers: {
							authorization:
								'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI5NTkwMjQ4IiwiTW9sSWQiOiI5NTk0MjQwIiwic3ViIjoi0KDRg9C00LXQvdC60L4g0J4u0JIuIiwiZW1haWwiOiJydWRlbmtvLm92QHNzbmFiLnJ1IiwianRpIjoiN2E5Y2I2ZDAtZjM2Mi00MWNjLWI2MWQtZmE1MTM3ZTBhMDQyIiwiYXVkIjoiaHR0cHM6Ly9lcnAtZGV2LnNzbmFiLml0IiwiaXNzIjoiU1MuRVJQLkRldiIsIm5iZiI6MTc0MjgxNTgxOSwiZXhwIjoxNzQzNDIwNjE5LCJpYXQiOjE3NDI4MTU4MTl9.DZTE2YLTg2F3gp35cwuak46ekRzgSo0pfaeEs6yUZL0',
						},
					},
				)
				.subscribe((resp) => {
					if (resp.type === HttpEventType.Response) {
						this.fileLoadProgress.set(100);
					}

					if (resp.type === HttpEventType.UploadProgress) {
						if (resp.total) {
							this.fileLoadProgress.set(
								Math.round((100 * resp.loaded) / resp.total),
							);
						}
					}
				});
		}
	}

	public uploadCancel(): void {
		if (this.fileLoadSubscription) {
			this.fileLoadSubscription.unsubscribe();
		}
	}

	public submitOtp(): void {
		if (this.otpCtrl.invalid) {
			this.otpCtrl.setErrors(null);

			return;
		}

		this.otpCtrl.setErrors({ invalidOtp: true });
	}

	public openRightSidebar(): void {
		this.sharedPopupService.openRightSidePage<TestModalData>(
			TestRightSidePageComponent,
			{ id: 0, text: 'Какой то текст' },
			'860px',
		);
	}

	public changeTab(index: number): void {
		this.indexTab = index;
	}

	public changeIndex(): void {
		this.indexTab = 4;
	}
}
