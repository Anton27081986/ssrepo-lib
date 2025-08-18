import {
	effect,
	Inject,
	Injector,
	OnDestroy,
	signal,
	TemplateRef,
	untracked,
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
 * [isOpen]: boolean - Открытие выпадающего списка - необязательный,
 * по умолчанию: 'false'
 *
 * [scrollOnOpen]: boolean - Прокрутка списка при открытии - необязательный,
 * по умолчанию: 'false'
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
	public readonly isOpen = input<boolean>(false);
	public readonly scrollOnOpen = input<boolean>(false);

	public readonly closed = output<void>();
	public readonly value = output<T | string | null | IDictionaryItemDto>();

	private readonly selectedIndex = signal<number>(0);
	private readonly subscriptions = new Set<Subscription>();

	constructor(@Inject(Injector) private readonly injector: Injector) {
		afterNextRender(() => this.initOptionSubscriptions());
	}

	public ngOnDestroy(): void {
		this.clearSubscriptions();
	}

	private initOptionSubscriptions(): void {
		runInInjectionContext(this.injector, () => {
			effect(() => {
				this.clearSubscriptions();

				this.optionsContent().forEach((option, index) => {
					if (this.scrollOnOpen() && option.selected()) {
						this.selectedIndex.set(index);
					}

					this.subscriptions.add(
						outputToObservable(option.valueEvent)
							.pipe(tap((data) => this.selectOption(data, index)))
							.subscribe(),
					);
				});
			});

			effect(() => {
				if (!this.scrollOnOpen() || !this.isOpen()) {
					return;
				}

				untracked(() => {
					setTimeout(() => {
						const option =
							this.optionsContent()[this.selectedIndex()];

						option?.elementRef.nativeElement.scrollIntoView({
							behavior: 'instant',
							block: 'start',
						});
					}, 0);
				});
			});
		});
	}

	private selectOption(
		item: T | string | IDictionaryItemDto | null,
		index?: number,
	): void {
		if (this.scrollOnOpen()) {
			this.setCurrentIndex(index || 0);
		}

		this.value.emit(item);
		this.closed.emit();
	}

	private setCurrentIndex(index: number): void {
		if (this.scrollOnOpen()) {
			this.selectedIndex.set(index || 0);
		}
	}

	private clearSubscriptions(): void {
		this.subscriptions.forEach((subscription) =>
			subscription.unsubscribe(),
		);
		this.subscriptions.clear();
	}
}
