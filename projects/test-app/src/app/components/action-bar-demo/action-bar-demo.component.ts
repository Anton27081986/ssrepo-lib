import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
	ActionBarComponent,
	ActionBarItemComponent,
	DividerComponent,
	DropdownItemComponent,
	DropdownListComponent,
} from '../../../../../front-components/src/lib/components';
import { PopoverTriggerForDirective } from '../../../../../front-components/src/lib/core/directives';
import {
	ActionBarItemType,
	ExtraSize,
	IconType,
	Colors,
} from '../../../../../front-components/src/lib/shared/models';

@Component({
	selector: 'app-action-bar-demo',
	standalone: true,
	template: ` <div class="section">
		<h2 class="section-title">Action bar</h2>

		<p class="section-description">
			A customizable panel for displaying interactive action items support
			for various sizes and optional close functionality.
		</p>

		<div class="component-row">
			<ss-lib-action-bar [size]="ExtraSize.xxs">
				<ss-lib-action-bar-item
					[leftIconConfig]="{
						icon: IconType.LinkExternal01,
					}"
				/>

				<ss-lib-action-bar-item
					[leftIconConfig]="{
						icon: IconType.Message,
					}"
				/>

				<ss-lib-action-bar-item
					[leftIconConfig]="{
						icon: IconType.Message,
					}"
					[text]="'3'"
				/>
			</ss-lib-action-bar>
		</div>

		<div class="component-row">
			<ss-lib-action-bar [showClose]="true">
				<ss-lib-action-bar-item
					[type]="ActionBarItemType.Info"
					[leftIconConfig]="{
						icon: IconType.CheckCircle,
						color: Colors.IconInformation,
					}"
					[text]="'Выбрано элементов: 1 из 200'"
				/>

				<ss-lib-action-bar-item
					[leftIconConfig]="{ icon: IconType.FileSearch02 }"
					[text]="'Заказ-наряд'"
					[rightIconConfig]="{ icon: IconType.ChevronDown }"
					[popoverTriggerFor]="dropdownTest"
				/>

				<ss-lib-action-bar-item
					[leftIconConfig]="{ icon: IconType.FilePreviewSearch }"
					[text]="'Рассчитать сырьё'"
					[rightIconConfig]="{ icon: IconType.ChevronDown }"
					[popoverTriggerFor]="dropdownTest"
				/>

				<ss-lib-action-bar-item
					[leftIconConfig]="{ icon: IconType.Trash }"
					[text]="'Удалить'"
					[isDestructive]="true"
				/>
			</ss-lib-action-bar>

			<ss-lib-dropdown-list
				#dropdownTest
				[width]="'162px'"
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
		</div>
	</div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		ActionBarComponent,
		ActionBarItemComponent,
		PopoverTriggerForDirective,
		DropdownListComponent,
		DropdownItemComponent,
		DividerComponent,
	],
})
export class ActionBarDemoComponent {
	protected readonly ExtraSize = ExtraSize;
	protected readonly IconType = IconType;
	protected readonly ActionBarItemType = ActionBarItemType;
	protected readonly console = console;
	protected readonly Colors = Colors;
}
