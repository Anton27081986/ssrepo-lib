import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '../../../lib/components/select/select.component';
import { DropdownListComponent } from '../../../lib/components/dropdown-list/dropdown-list.component';

/**
 * Обертка для компонента Select.
 *
 * @description
 * Компонент-обертка для демонстрации
 * Select в Storybook.
 */
@Component({
	selector: 'ss-lib-select-wrapper',
	standalone: true,
	imports: [SelectComponent, DropdownListComponent, ReactiveFormsModule],
	template: `
		<ss-lib-select
			[formControl]="control"
			[placeholder]="placeholder()"
		>
			<ss-lib-dropdown-list>
				<ss-lib-dropdown-item
					*ngFor="let item of items"
					[value]="item"
				>
					{{ item.label }}
				</ss-lib-dropdown-item>
			</ss-lib-dropdown-list>
		</ss-lib-select>
	`,
})
export class SelectWrapperComponent {
	/**
	 * Контрол формы для управления значением.
	 *
	 * @description
	 * FormControl для управления значением
	 * компонента Select.
	 */
	public readonly control = new FormControl<string | null>(null);

	/**
	 * Плейсхолдер поля ввода.
	 *
	 * @default 'Выберите из списка'
	 * @description
	 * Текст, отображаемый в поле ввода,
	 * когда значение не выбрано.
	 */
	public readonly placeholder = input<string>('Выберите из списка');

	/**
	 * Список опций для выбора.
	 *
	 * @description
	 * Массив объектов, представляющих
	 * доступные опции для выбора.
	 */
	public readonly items = [
		{ id: '1', label: 'Опция 1' },
		{ id: '2', label: 'Опция 2' },
		{ id: '3', label: 'Опция 3' },
	];
}
