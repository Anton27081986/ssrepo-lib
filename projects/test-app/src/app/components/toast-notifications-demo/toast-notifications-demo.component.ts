import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
	ButtonComponent,
	ToastRef,
} from '../../../../../front-components/src/lib/components';
import {
	ButtonType,
	IconPosition,
	IconType,
	ToastTypeEnum,
} from '../../../../../front-components/src/lib/shared/models';
import { SharedPopupService } from '../../../../../front-components/src/lib/shared/services';

@Component({
	selector: 'app-toast-notifications-demo',
	standalone: true,
	template: ` <div class="section">
		<h2 class="section-title">Toast Notifications</h2>
		<p class="section-description">
			Demonstrates various toast notification types and theme toggle
			functionality.
		</p>
		<div class="sub-section">
			<ss-lib-button
				class="spaced"
				[type]="ButtonType.Ghost"
				[text]="'Toggle Dark/Light Theme'"
				[icon]="IconType.Sun"
				[iconPosition]="IconPosition.Start"
				(click)="toggleTheme()"
			></ss-lib-button>
		</div>
		<div class="component-row">
			<ss-lib-button
				[type]="ButtonType.Primary"
				[text]="'Default Toast'"
				(click)="showToastDefault()"
			></ss-lib-button>
			<ss-lib-button
				[type]="ButtonType.Primary"
				[text]="'Error Toast'"
				(click)="showToastError()"
			></ss-lib-button>
			<ss-lib-button
				[type]="ButtonType.Primary"
				[text]="'Success Toast'"
				(click)="showToastSuccess()"
			></ss-lib-button>
			<ss-lib-button
				[type]="ButtonType.Primary"
				[text]="'Toast с доп кнопкой'"
				(click)="showToastWithButton()"
			></ss-lib-button>

			<ss-lib-button
				[type]="ButtonType.Primary"
				[text]="'Toast с доп кнопкой и большим текстом'"
				(click)="showToastWithButtonLarge()"
			></ss-lib-button>
		</div>
		<div class="component-row">
			<ss-lib-button
				[type]="ButtonType.Secondary"
				[text]="'API Success'"
				(click)="viewToastSuccess()"
			></ss-lib-button>
			<ss-lib-button
				[type]="ButtonType.Secondary"
				[text]="'API Error'"
				(click)="exampleMetod({ email: 'sydney@fife' })"
			></ss-lib-button>
		</div>
	</div>`,
	styles: [``],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ButtonComponent],
})
export class ToastNotificationsDemoComponent {
	private readonly sharedPopupService = inject(SharedPopupService);
	private readonly http = inject(HttpClient);

	protected readonly ButtonType = ButtonType;
	protected readonly IconType = IconType;
	protected readonly IconPosition = IconPosition;

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
}
