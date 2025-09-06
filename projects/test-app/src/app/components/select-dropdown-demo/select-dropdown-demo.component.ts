import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
	ButtonComponent,
	DropdownItemComponent,
	DropdownListComponent,
	IconComponent,
	FormFieldComponent,
	SelectComponent,
} from '../../../../../front-components/src/lib/components';
import {
	ButtonType,
	ExtraSize,
	IconPosition,
	IconType,
	IDictionaryItemDto,
} from '../../../../../front-components/src/lib/shared/models';
import {
	FieldCtrlDirective,
	PopoverTriggerForDirective,
} from '../../../../../front-components/src/lib/core/directives';
import { DROPDOWN_ITEMS, WEEK_ITEMS } from '../../utils/constants';

@Component({
	selector: 'app-select-dropdown-demo',
	standalone: true,
	template: ` <div class="section">
		<h2 class="section-title">Select Dropdown</h2>

		<p class="section-description">
			Select component with dropdown options.
		</p>

		<div class="component-row">
			<ss-lib-form-field
				[label]="'Название'"
				[hint]="'Подсказка'"
				[errorText]="'Неверно заполнено'"
				[showValidationFieldIcon]="true"
			>
				<ss-lib-select
					fieldCtrl
					[formControl]="selectCtrl"
					[popoverTriggerFor]="dropdown2"
				>
					<ss-lib-dropdown-list #dropdown2>
						@for (item of dropdownItems; track item.id) {
							<ss-lib-dropdown-item
								[value]="item"
								[icon]="IconType.Bell"
							></ss-lib-dropdown-item>
						}
					</ss-lib-dropdown-list>
				</ss-lib-select>
			</ss-lib-form-field>
		</div>
		<p class="section-description">
			Dropdown component with custom templates and scrolling to selected
			item.
		</p>

		<div class="component-row">
			<ss-lib-button
				[iconPosition]="IconPosition.Start"
				[icon]="IconType.Calendar"
				[popoverTriggerFor]="listActions"
				[type]="ButtonType.Secondary"
				[text]="activeWeek()?.name || 'Выберите неделю'"
				[size]="ExtraSize.lg"
				(isPopoverOpenEmit)="dropdownWeekIsOpen.set($event)"
			>
				<ss-lib-icon
					[icon]="IconType.ChevronDown"
					[width]="'20'"
					[height]="'20'"
				></ss-lib-icon>
			</ss-lib-button>

			<ss-lib-dropdown-list
				#listActions
				[height]="'274px'"
				[width]="'236px'"
				[scrollOnOpen]="true"
				[isOpen]="dropdownWeekIsOpen()"
			>
				@for (week of dropdownWeeks; track week.id) {
					<ss-lib-dropdown-item
						[value]="week"
						[label]="week.name"
						[selected]="activeWeek()?.id === week.id"
						(click)="activeWeek.set(week)"
					/>
				}
			</ss-lib-dropdown-list>
		</div>
	</div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		ButtonComponent,
		DropdownItemComponent,
		IconComponent,
		DropdownListComponent,
		FormFieldComponent,
		SelectComponent,
		FieldCtrlDirective,
		ReactiveFormsModule,
		PopoverTriggerForDirective,
	],
})
export class SelectDropdownDemoComponent {
	public selectCtrl = new FormControl(null);
	public activeWeek = signal<IDictionaryItemDto | null>(WEEK_ITEMS[30]);
	public dropdownWeekIsOpen = signal<boolean>(false);

	protected readonly IconPosition = IconPosition;
	protected readonly IconType = IconType;
	protected readonly ButtonType = ButtonType;
	protected readonly ExtraSize = ExtraSize;
	protected readonly dropdownItems = DROPDOWN_ITEMS;
	protected readonly dropdownWeeks = WEEK_ITEMS;
}
