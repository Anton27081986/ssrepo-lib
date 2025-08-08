import {
	effect,
	Inject,
	Injector,
	OnDestroy,
	TemplateRef,
	ViewEncapsulation,
} from '@angular/core';
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
import { outputToObservable } from '@angular/core/rxjs-interop';
import { Subscription, tap } from 'rxjs';
import { NgTemplateOutlet } from '@angular/common';
import type {
	IDictionaryItemDto,
	PopoverContent,
} from '../../../shared/models';
import { DropdownItemComponent } from '../dropdown-item/dropdown-item.component';
import { DividerComponent } from '../../divider/divider.component';
import { ScrollbarComponent } from '../../scrollbar/scrollbar.component';
import { DropdownGroupDirective } from '../directives/dropdown-group.directive';

/**
 * Компонент выпадающего списка с поддержкой кастомных шаблонов, прокрутки и динамического контента
 *
 * @example
 * ```html
 * Параметры:
 *
 * [headerTemplateRef]: TemplateRef - Шаблон заголовка списка - необязательный,
 * по умолчанию: null
 *
 * [width]: string - Ширина выпадающего списка - необязательный,
 * по умолчанию: 'max-content'
 *
 * [height]: string - Высота выпадающего списка - необязательный,
 * по умолчанию: 'auto'
 *
 * [isDraggable]: boolean - Возможность перетскивания,
 * по умолчанию: 'false'
 *
 * (value): T | string | null - Событие выбора элемента - обязательный
 *
 * (closed): void - Событие закрытия списка - обязательный
 *
 * Компоненты:
 * ss-lib-dropdown-item - Элемент списка
 *
 * <ss-lib-dropdown-list
 *   [headerTemplateRef]="headerTemplate"
 *   [width]="'240px'"
 *   [height]="'320px'"
 *   (value)="onSelect($event)"
 *   (closed)="onClose()"
 * >
 *   <ss-lib-dropdown-item
 *     *ngFor="let item of items"
 *     [label]="item.name"
 *     [value]="item"
 *     [icon]="item.icon"
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
	encapsulation: ViewEncapsulation.None,
	imports: [NgTemplateOutlet, DividerComponent, ScrollbarComponent],
})
export class DropdownListComponent<
		T extends IDictionaryItemDto = IDictionaryItemDto,
	>
	implements PopoverContent, OnDestroy
{
	public readonly optionsContentGroup = contentChildren(
		DropdownGroupDirective,
	);

	public readonly optionsContent = contentChildren(DropdownItemComponent<T>);
	public readonly templateRef =
		viewChild.required<TemplateRef<{}>>('dropdownTemplate');

	public readonly headerTemplateRef = input<TemplateRef<unknown> | null>(
		null,
	);

	public readonly width = input<string>('max-content');
	public readonly height = input<string>('auto');

	public readonly closed = output<void>();
	public readonly value = output<T | string | null | IDictionaryItemDto>();

	private readonly subscriptions = new Set<Subscription>();

	constructor(@Inject(Injector) private readonly injector: Injector) {
		afterNextRender(() => this.initOptionSubscriptions());
	}

	private initOptionSubscriptions(): void {
		runInInjectionContext(this.injector, () => {
			effect(() => {
				this.clearSubscriptions();

				for (const option of this.optionsContent()) {
					this.subscriptions.add(
						outputToObservable(option.valueEvent)
							.pipe(tap((data) => this.selectOption(data)))
							.subscribe(),
					);
				}
			});
		});
	}

	private clearSubscriptions(): void {
		this.subscriptions.forEach((subscription) =>
			subscription.unsubscribe(),
		);
		this.subscriptions.clear();
	}

	public selectOption(item: T | string | IDictionaryItemDto | null): void {
		this.value.emit(item);
		this.closed.emit();
	}

	public ngOnDestroy(): void {
		this.clearSubscriptions();
	}
}
