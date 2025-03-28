import { Component, input } from '@angular/core';
import { DropdownListComponent } from '../../../lib/components/dropdown-list/dropdown-list.component';
import { DropdownItemComponent } from '../../../lib/components/dropdown-item/dropdown-item.component';

interface DropdownItem {
	id: string;
	label: string;
}

/**
 * Обертка для компонента DropdownList.
 *
 * @description
 * Компонент-обертка для демонстрации
 * DropdownList в Storybook.
 */
@Component({
	selector: 'ss-lib-dropdown-list-wrapper',
	standalone: true,
	imports: [DropdownListComponent, DropdownItemComponent],
	template: `
		<ss-lib-dropdown-list
			[width]="width()"
			[height]="height()"
			(value)="onValue($event)"
			(closed)="onClosed()"
		>
			<ng-template #dropdownTemplate>
				<ss-lib-dropdown-item
					*ngFor="let item of items"
					[value]="item"
				>
					{{ item.label }}
				</ss-lib-dropdown-item>
			</ng-template>
		</ss-lib-dropdown-list>
	`,
})
export class DropdownListWrapperComponent {
	/**
	 * Ширина выпадающего списка.
	 *
	 * @default 'max-content'
	 * @description
	 * Ширина списка в пикселях или процентах.
	 */
	public readonly width = input<string>('max-content');

	/**
	 * Высота выпадающего списка.
	 *
	 * @default 'auto'
	 * @description
	 * Высота списка в пикселях или процентах.
	 */
	public readonly height = input<string>('auto');

	/**
	 * Список элементов для отображения.
	 *
	 * @description
	 * Массив элементов с идентификаторами
	 * и метками для отображения в списке.
	 */
	public readonly items: DropdownItem[] = [
		{ id: '1', label: 'Опция 1' },
		{ id: '2', label: 'Опция 2' },
		{ id: '3', label: 'Опция 3' },
	];

	/**
	 * Обработчик выбора значения.
	 *
	 * @param value - Выбранное значение.
	 * @description
	 * Обрабатывает выбранное значение.
	 */
	public onValue(_value: DropdownItem): void {
		// Обработка выбранного значения
	}

	/**
	 * Обработчик закрытия списка.
	 *
	 * @description
	 * Обрабатывает закрытие списка.
	 */
	public onClosed(): void {
		// Обработка закрытия списка
	}
}
