import {
	Component,
	ElementRef,
	inject,
	signal,
	viewChild,
	WritableSignal,
} from '@angular/core';
import {
	AbstractControl,
	FormControl,
	ValidationErrors,
	Validators,
} from '@angular/forms';
import { catchError, Observable, of, Subscription, tap } from 'rxjs';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import {
	ActionBarItemType,
	ButtonType,
	Colors,
	ExtraSize,
	IconPosition,
	IconType,
	LinkAppearance,
	Orientation,
	Shape,
	Status,
	TagType,
	TextType,
	TextWeight,
	ToastTypeEnum,
	TooltipPosition,
	IDictionaryItemDto,
	NavButton,
} from '../../../../front-components/src/lib/shared/models';
import { standImports } from './stand.imports';
import {
	BANNERS_ITEMS,
	DROPDOWN_ITEMS,
	MENU_LIST,
	TABS,
	WEEK_ITEMS,
} from './constants';
import { SharedPopupService } from '../../../../front-components/src/lib/shared/services';
import type { TestModalData } from '../test-modal/test-modal.component';
import { TestModalComponent } from '../test-modal/test-modal.component';
import {
	ToastRef,
	ConfirmModalComponent,
} from '../../../../front-components/src/lib/components';
import { TestRightSidePageComponent } from '../test-left-side-page/test-right-side-page.component';

@Component({
	selector: 'app-stand',
	standalone: true,
	imports: [...standImports],
	providers: [RouterOutlet],
	templateUrl: './stand.component.html',
	styleUrl: './stand.component.scss',
})
export class StandComponent {
	public readonly popoverBtnElement = viewChild('popoverBtn', {
		read: ElementRef,
	});

	public offset: WritableSignal<number> = signal(0);

	public imgCtrl = new FormControl(null);

	public toggleCtrl = new FormControl(false);
	public inputCtrl = new FormControl('rrrr', [
		Validators.required,
		Validators.minLength(10),
	]);

	public inputCtrlDisabled = new FormControl({
		value: 'rrrr',
		disabled: true,
	});

	public textareaCtrl = new FormControl('rrrr', [
		Validators.required,
		Validators.minLength(10),
	]);

	public textareaCtrlDisabled = new FormControl({
		value: 'rrrr',
		disabled: true,
	});

	public indexTab = 0;

	public selectCtrl = new FormControl(null);
	public selectWeeksCtrl = new FormControl(null);
	public activeWeek = signal<IDictionaryItemDto | null>(WEEK_ITEMS[30]);
	public dropdownWeekIsOpen = signal<boolean>(false);
	public numberPickerCtrl = new FormControl(2);

	public datepickerCtrl: FormControl<Date | null> = new FormControl(
		new Date('2025-07-09T09:42:01.028Z'),
	);

	public minDate = new Date(2025, 7, 12);
	public maxDate = new Date(2025, 7, 20);

	public timepickerCtrl = new FormControl(null);
	public dateTimepickerCtrl: FormControl<Date | null> = new FormControl(
		new Date(),
	);

	public checkboxControl = new FormControl(false);
	public isIndeterminate = false;
	public masterCheckboxCtrl = new FormControl(true);
	public checkBox2 = new FormControl(false);
	public checkBox3 = new FormControl(false);
	public checkBox4 = new FormControl({ value: true, disabled: true });
	public checkBox5 = new FormControl({ value: true, disabled: true });
	public checkBox6 = new FormControl({ value: false, disabled: true });

	public otpCtrl = new FormControl('');

	public fileLoadProgress = signal<number>(0);
	public fileLoadSubscription?: Subscription;

	public carouselIndex = signal(0);

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
	protected readonly dropdownWeeks = WEEK_ITEMS;
	protected readonly TooltipPosition = TooltipPosition;
	protected readonly bannersItems = BANNERS_ITEMS;
	protected readonly TagType = TagType;
	protected readonly ActionBarItemType = ActionBarItemType;
	protected readonly TABS = TABS;
	protected readonly NavButton = NavButton;
	protected readonly menulist = MENU_LIST;

	private readonly sharedPopupService = inject(SharedPopupService);

	protected readonly statusType = Status;

	constructor(private readonly http: HttpClient) {
		toSignal(
			this.masterCheckboxCtrl.valueChanges.pipe(
				tap((value: boolean | null) => {
					this.checkBox2.setValue(value, { emitEvent: false });
					this.checkBox3.setValue(value, { emitEvent: false });
					this.updateIndeterminateState();
				}),
			),
		);

		toSignal(
			this.checkBox2.valueChanges.pipe(
				tap(() => {
					this.updateMasterCheckbox();
				}),
			),
		);

		toSignal(
			this.checkBox3.valueChanges.pipe(
				tap(() => {
					this.updateMasterCheckbox();
				}),
			),
		);
	}

	public get iconsList(): Array<keyof typeof IconType> {
		return Object.keys(IconType) as Array<keyof typeof IconType>;
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

	public submit(): Observable<unknown> {
		return of([]);
	}

	public toggleTheme(): void {
		const body = document.body;

		if (body.classList.contains('dark')) {
			body.classList.remove('dark');
		} else {
			body.classList.add('dark');
		}
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

	public showToastWithButton(): ToastRef {
		return this.sharedPopupService.openToast({
			text: 'Toast с кнопкой Пнока',
			type: ToastTypeEnum.Default,
			mainButton: {
				text: 'Пнока',
				click: () => {
					console.warn('Кнопка Пнока была нажата!');
					// Можно добавить любую логику
				},
			},
			secondaryButton: {
				text: 'Вторичная кнопка',
				click: () => {
					console.warn('Вторичная кнопка была нажата!');
				},
			},
		});
	}

	public showToastWithButtonLarge(): ToastRef {
		return this.sharedPopupService.openToast({
			text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
			type: ToastTypeEnum.Default,
			mainButton: {
				text: 'Пнока',
				click: () => {
					console.warn('Кнопка Пнока была нажата!');
					// Можно добавить любую логику
				},
			},
			secondaryButton: {
				text: 'Вторичная кнопка',
				click: () => {
					console.warn('Вторичная кнопка была нажата!');
				},
			},
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
				.subscribe({
					next: (resp) => {
						if (resp.type === HttpEventType.Response) {
							this.fileLoadProgress.set(100);
						}

						if (
							resp.type === HttpEventType.UploadProgress &&
							resp.total
						) {
							this.fileLoadProgress.set(
								Math.round((100 * resp.loaded) / resp.total),
							);
						}
					},
					error: (err: unknown) => {
						this.sharedPopupService.openToast({
							text: 'Ошибка при загрузке файла, включи впн',
							type: ToastTypeEnum.Error,
						});

						console.error('Ошибка при загрузке файла:', err);
						this.fileLoadProgress.set(0);
					},
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

	public openRightSidebar(hasBackdrop: boolean): void {
		this.sharedPopupService.openRightSidePage<TestModalData>(
			TestRightSidePageComponent,
			{ id: 0, text: 'Какой то текст' },
			'645px',
			hasBackdrop,
			true,
		);
	}

	public changeTab(index: number): void {
		this.indexTab = index;
	}

	public test(): void {
		console.warn('test');
	}

	// Toggle requiredTrue validator
	public toggleRequiredValidator(): void {
		if (this.checkboxControl.hasValidator(Validators.requiredTrue)) {
			this.checkboxControl.clearValidators();
		} else {
			this.checkboxControl.setValidators(Validators.requiredTrue);
		}

		this.checkboxControl.updateValueAndValidity();
	}

	// Set custom validator
	public setCustomValidator(): void {
		const customValidator = (
			control: AbstractControl,
		): ValidationErrors | null => {
			return control.value === true
				? null
				: { customError: 'Чекбокс должен быть отмечен' };
		};

		this.checkboxControl.setValidators(customValidator);
		this.checkboxControl.updateValueAndValidity();
	}

	// Clear all validators
	public clearValidators(): void {
		this.checkboxControl.clearValidators();
		this.checkboxControl.updateValueAndValidity();
	}

	// Reset control value and state
	public resetControl(): void {
		this.checkboxControl.reset(false);
	}

	private updateMasterCheckbox(): void {
		const checkBox2Value = this.checkBox2.value;
		const checkBox3Value = this.checkBox3.value;

		// Update indeterminate state
		this.updateIndeterminateState();

		// Update master checkbox value
		if (checkBox2Value && checkBox3Value) {
			this.masterCheckboxCtrl.setValue(true, { emitEvent: false });
		} else if (!checkBox2Value && !checkBox3Value) {
			this.masterCheckboxCtrl.setValue(false, { emitEvent: false });
		}
	}

	private updateIndeterminateState(): void {
		const checkBox2Value = !!this.checkBox2.value;
		const checkBox3Value = !!this.checkBox3.value;

		// Indeterminate when some but not all checkboxes are checked
		this.isIndeterminate =
			checkBox2Value !== checkBox3Value ||
			(checkBox2Value && !checkBox3Value) ||
			(!checkBox2Value && checkBox3Value);
	}
}
