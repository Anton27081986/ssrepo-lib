import { Component, input } from '@angular/core';
import { DropdownItemComponent } from '../../../lib/components/dropdown-item/dropdown-item.component';
import { IconType } from '../../../lib/shared/models';

/**
 * Обертка для компонента DropdownItem.
 *
 * @description
 * Компонент-обертка для демонстрации
 * DropdownItem в Storybook.
 */
@Component({
	selector: 'ss-lib-dropdown-item-wrapper',
	standalone: true,
	imports: [DropdownItemComponent],
	template: `
		<ss-lib-dropdown-item
			[label]="label()"
			[value]="value()"
			[icon]="icon()"
			[isDestructive]="isDestructive()"
			[isDisabled]="isDisabled()"
			(valueEvent)="onValue($event)"
		></ss-lib-dropdown-item>
	`,
})
export class DropdownItemWrapperComponent {
	/**
	 * Текст элемента.
	 *
	 * @default ''
	 * @description
	 * Текст, отображаемый в элементе списка.
	 */
	public readonly label = input<string>('');

	/**
	 * Значение элемента.
	 *
	 * @default null
	 * @description
	 * Данные элемента списка.
	 */
	public readonly value = input<unknown>(null);

	/**
	 * Иконка элемента.
	 *
	 * @default null
	 * @description
	 * Тип иконки, отображаемой в элементе.
	 */
	public readonly icon = input<IconType | null>(null);

	/**
	 * Флаг деструктивного действия.
	 *
	 * @default false
	 * @description
	 * Определяет, является ли элемент
	 * деструктивным действием.
	 */
	public readonly isDestructive = input<boolean>(false);

	/**
	 * Флаг блокировки элемента.
	 *
	 * @default false
	 * @description
	 * Определяет, заблокирован ли элемент
	 * для взаимодействия.
	 */
	public readonly isDisabled = input<boolean>(false);

	/**
	 * Обработчик выбора значения.
	 *
	 * @param value - Выбранное значение.
	 * @description
	 * Обрабатывает выбранное значение.
	 */
	public onValue(_value: unknown): void {
		// Обработка выбранного значения
	}
}
