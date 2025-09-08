import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
	AvatarButtonComponent,
	AvatarComponent,
	DropdownItemComponent,
	DropdownListComponent,
	TextComponent,
	DividerComponent,
} from '../../../../../front-components/src/lib/components';
import { PopoverTriggerForDirective } from '../../../../../front-components/src/lib/core/directives';
import {
	Colors,
	IconType,
	TextType,
	TextWeight,
} from '../../../../../front-components/src/lib/shared/models';

@Component({
	selector: 'app-avatar-dropdown-demo',
	standalone: true,
	template: ` <div class="section">
		<h2 class="section-title">Avatar Dropdown</h2>

		<p class="section-description">
			Avatar button with dropdown menu and custom header.
		</p>

		<div class="component-row">
			<ss-lib-avatar-button
				[username]="'ВН'"
				[src]="'https://i.pravatar.cc/300'"
				[popoverTriggerFor]="dropdown1"
			></ss-lib-avatar-button>

			<ss-lib-dropdown-list
				#dropdown1
				[headerTemplateRef]="avatarHeader"
			>
				<ss-lib-dropdown-item
					[label]="'Опция'"
					[icon]="IconType.Bell"
					[selected]="true"
					(click)="console.log(1)"
				></ss-lib-dropdown-item>

				<ss-lib-dropdown-item
					[label]="'Опция'"
					[icon]="IconType.Bell"
					(click)="console.log(1)"
				></ss-lib-dropdown-item>

				<ss-lib-dropdown-item
					[label]="'Опция'"
					[icon]="IconType.Bell"
					(click)="console.log(1)"
				></ss-lib-dropdown-item>

				<ss-lib-dropdown-item
					[label]="'Опция'"
					[icon]="IconType.Bell"
					[isDisabled]="true"
					(click)="console.log(2)"
				></ss-lib-dropdown-item>

				<ss-lib-divider class="divider"></ss-lib-divider>

				<ss-lib-dropdown-item
					[label]="'Удалить'"
					[icon]="IconType.Bell"
					(click)="console.log(5)"
				></ss-lib-dropdown-item>

				<ss-lib-dropdown-item
					[label]="'Удалить'"
					[icon]="IconType.Bell"
					(click)="console.log(5)"
				></ss-lib-dropdown-item>
			</ss-lib-dropdown-list>

			<ng-template #avatarHeader>
				<div class="avatar-test">
					<ss-lib-avatar
						[username]="'ВН'"
						[src]="'https://i.pravatar.cc/300'"
					></ss-lib-avatar>

					<div class="avatar-test__title">
						<ss-lib-text
							[type]="TextType.BodySm"
							[weight]="TextWeight.Medium"
							[color]="Colors.TextBody2"
						>
							Мария Викторовна
						</ss-lib-text>

						<ss-lib-text
							[type]="TextType.BodySm"
							[weight]="TextWeight.Regular"
							[color]="Colors.TextBody3"
						>
							Менеджер по продажам
						</ss-lib-text>
					</div>
				</div>
			</ng-template>
		</div>
	</div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		AvatarButtonComponent,
		AvatarComponent,
		PopoverTriggerForDirective,
		DropdownListComponent,
		DropdownItemComponent,
		TextComponent,
		DividerComponent,
	],
})
export class AvatarDropdownDemoComponent {
	protected readonly IconType = IconType;
	protected readonly console = console;
	protected readonly TextType = TextType;
	protected readonly TextWeight = TextWeight;
	protected readonly Colors = Colors;
}
