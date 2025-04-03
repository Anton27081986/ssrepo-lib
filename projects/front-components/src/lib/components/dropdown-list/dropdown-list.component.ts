import { Inject, Injector, TemplateRef } from '@angular/core';
import {
	afterNextRender,
	ChangeDetectionStrategy,
	Component,
	contentChildren,
	input,
	output,
	runInInjectionContext,
	viewChild,
} from '@angular/core';
import { outputToObservable, toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { NgTemplateOutlet } from '@angular/common';
import type { IDictionaryItemDto, PopoverContent } from '../../shared/models';
import { DropdownItemComponent } from '../dropdown-item/dropdown-item.component';
import { DividerComponent } from '../divider/divider.component';
import { ScrollbarComponent } from '../scrollbar/scrollbar.component';

/**
 * Компонент выпадающего списка с поддержкой кастомных шаблонов и прокрутки
 *
 * @example
 * ```html
 * Параметры:
 *
 * [headerTemplateRef]: TemplateRef - Шаблон заголовка списка -
 * необязательный, по умолчанию: null
 *
 * [width]: string - Ширина выпадающего списка - необязательный,
 * по умолчанию: 'max-content'
 *
 * [height]: string - Высота выпадающего списка - необязательный,
 * по умолчанию: 'auto'
 *
 * (value): T | string | null - Событие выбора элемента - обязательный
 *
 * (closed): void - Событие закрытия списка - обязательный
 *
 * <ss-lib-dropdown-list
 *   [headerTemplateRef]="headerTemplate"
 *   [width]="'200px'"
 *   [height]="'300px'"
 *   (value)="onSelect($event)"
 *   (closed)="onClose()"
 * >
 *   <ss-lib-dropdown-item
 *     *ngFor="let item of items"
 *     [value]="item"
 *   />
 * </ss-lib-dropdown-list>
 * ```
 */
@Component({
	selector: 'ss-lib-dropdown-list',
	standalone: true,
	templateUrl: './dropdown-list.component.html',
	styleUrl: './dropdown-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgTemplateOutlet, DividerComponent, ScrollbarComponent],
})
export class DropdownListComponent<
	T extends IDictionaryItemDto = IDictionaryItemDto,
> implements PopoverContent
{
	/**
	 * Содержимое списка.
	 *
	 * @description
	 * Коллекция дочерних компонентов DropdownItem,
	 * представляющих элементы списка.
	 */
	public readonly optionsContent = contentChildren(DropdownItemComponent<T>);

	/**
	 * Шаблон выпадающего списка.
	 *
	 * @description
	 * Обязательный шаблон, определяющий структуру
	 * выпадающего списка.
	 */
	public readonly templateRef =
		viewChild.required<TemplateRef<{}>>('dropdownTemplate');

	/**
	 * Шаблон заголовка.
	 *
	 * @default null
	 * @description
	 * Опциональный шаблон для отображения
	 * заголовка списка.
	 */
	public readonly headerTemplateRef = input<TemplateRef<unknown> | null>(
		null,
	);

	/**
	 * Ширина списка.
	 *
	 * @default 'max-content'
	 * @description
	 * Определяет ширину выпадающего списка.
	 */
	public readonly width = input<string>('max-content');

	/**
	 * Высота списка.
	 *
	 * @default 'auto'
	 * @description
	 * Определяет высоту выпадающего списка.
	 */
	public readonly height = input<string>('auto');

	/**
	 * Событие закрытия списка.
	 *
	 * @description
	 * Генерируется при закрытии выпадающего
	 * списка.
	 */
	public readonly closed = output<void>();

	/**
	 * Событие выбора элемента.
	 *
	 * @description
	 * Генерируется при выборе элемента из списка.
	 */
	public readonly value = output<T | string | null>();

	/**
	 * Создает экземпляр компонента.
	 *
	 * @param injector - Инжектор Angular
	 * @description
	 * Инициализирует компонент и настраивает
	 * обработку событий выбора элементов.
	 */
	constructor(@Inject(Injector) private readonly injector: Injector) {
		afterNextRender(() => {
			runInInjectionContext(this.injector, () => {
				this.optionsContent().forEach((option) =>
					toSignal(
						outputToObservable(option.valueEvent).pipe(
							tap((data) => this.selectOption(data)),
						),
					),
				);
			});
		});
	}

	/**
	 * Обработчик выбора элемента.
	 *
	 * @param item - Выбранный элемент
	 * @description
	 * Генерирует событие выбора и закрывает
	 * выпадающий список.
	 */
	public selectOption(item: T | string | null): void {
		this.value.emit(item);
		this.closed.emit();
	}
}
