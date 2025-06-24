import {
	ChangeDetectionStrategy,
	Component,
	computed,
	ElementRef,
	HostListener,
	inject,
	input,
	output,
	signal,
	TemplateRef,
	viewChild,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { TextComponent } from '../text/text.component';
import {
	Colors,
	StateTypes,
	TextType,
	TextWeight,
	IconType,
	IDictionaryItemDto,
} from '../../shared/models';

/**
 * Компонент элемента выпадающего списка с поддержкой иконок и состояний
 *
 * @example
 * ```html
 * Параметры:
 *
 * [label]: string - Текст элемента списка - необязательный,
 * по умолчанию: ''
 *
 * [value]: T | string | null - Значение элемента - необязательный,
 * по умолчанию: null.
 * Также можно пробросить ng-content, тогда value не будет выводиться
 *
 * [icon]: IconType - Иконка элемента - необязательный,
 * по умолчанию: null
 *
 * [isDestructive]: boolean - Флаг деструктивного действия -
 * необязательный, по умолчанию: false
 *
 * [isDisabled]: boolean - Флаг блокировки элемента - необязательный,
 * по умолчанию: false
 *
 * [selected]: boolean - Флаг на выбранный элемент - необязательный,
 * по умолчанию: false
 *
 * (valueEvent): T | string | null - Событие выбора элемента -
 * обязательный
 *
 * <ss-lib-dropdown-item
 *   [label]="'Пункт меню'"
 *   [value]="item"
 *   [icon]="IconType.SomeIcon"
 *   [isDestructive]="false"
 *   [isDisabled]="false"
 *   (valueEvent)="onSelect($event)"
 * ></ss-lib-dropdown-item>
 * ```
 */
@Component({
	selector: 'ss-lib-dropdown-item',
	standalone: true,
	imports: [IconComponent, TextComponent, NgTemplateOutlet],
	templateUrl: './dropdown-item.component.html',
	styleUrl: './dropdown-item.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownItemComponent<
	T extends IDictionaryItemDto = IDictionaryItemDto,
> {
	public readonly elementRef = inject(ElementRef);

	public itemContent = viewChild<TemplateRef<unknown>>('content');

	public readonly label = input<string>('');
	public readonly value = input<T | string | null>(null);
	public readonly icon = input<IconType | null>(null);
	public readonly isDestructive = input<boolean>(false);
	public readonly isDisabled = input<boolean>(false);
	public readonly selected = input<boolean>(false);
	public readonly valueEvent = output<T | string | null>();
	public readonly state = signal<StateTypes>(StateTypes.Default);

	public readonly itemText = computed(() => {
		const val = this.value();

		if (typeof val === 'string') {
			return val;
		}

		return val ? val.name : this.label() || '';
	});

	public readonly iconColor = computed(() => {
		if (this.isDisabled()) {
			return Colors.IconDisabled;
		}

		if (this.state() === StateTypes.Hover) {
			return Colors.IconActionHover2;
		}

		if (this.isDestructive()) {
			return this.state() === StateTypes.Default
				? Colors.IconAction2
				: Colors.IconError;
		}

		return Colors.IconAction2;
	});

	public readonly textColor = computed(() => {
		if (this.isDisabled()) {
			return Colors.TextDisabled;
		}

		if (this.state() === StateTypes.Hover) {
			return Colors.TextActionHover2;
		}

		if (this.isDestructive()) {
			return this.state() === StateTypes.Default
				? Colors.TextAction2
				: Colors.TextError;
		}

		return Colors.TextAction2;
	});

	protected readonly TextType = TextType;
	protected readonly TextWeight = TextWeight;
	protected readonly StateTypes = StateTypes;
	protected readonly Colors = Colors;
	protected readonly IconType = IconType;

	@HostListener('click')
	public togglePopover(): void {
		this.valueEvent.emit(this.value());
	}

	public checkFocus(event: FocusEvent): void {
		const target = event.target as HTMLElement;

		if (target.matches(':focus-visible')) {
			this.state.set(StateTypes.Focused);
		}
	}
}
