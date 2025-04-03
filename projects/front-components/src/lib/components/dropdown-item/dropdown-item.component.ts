import {
	ChangeDetectionStrategy,
	Component,
	computed,
	HostListener,
	input,
	output,
	signal,
} from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { TextComponent } from '../text/text.component';
import type { IconType, IDictionaryItemDto } from '../../shared/models';
import { Colors, StateTypes, TextType, TextWeight } from '../../shared/models';

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
 * по умолчанию: null
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
	imports: [IconComponent, TextComponent],
	templateUrl: './dropdown-item.component.html',
	styleUrl: './dropdown-item.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownItemComponent<
	T extends IDictionaryItemDto = IDictionaryItemDto,
> {
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
	 * Данные элемента списка. Может быть строкой
	 * или объектом, реализующим IDictionaryItemDto.
	 */
	public readonly value = input<T | string | null>(null);

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
	 * Событие выбора элемента.
	 *
	 * @description
	 * Эмитит значение выбранного элемента.
	 */
	public readonly valueEvent = output<T | string | null>();

	/**
	 * Текущее состояние элемента.
	 *
	 * @description
	 * Определяет визуальное состояние
	 * элемента (default, focused).
	 */
	public readonly state = signal<StateTypes>(StateTypes.Default);

	/**
	 * Текст элемента для отображения.
	 *
	 * @description
	 * Вычисляемое значение текста элемента
	 * на основе value или label.
	 */
	public readonly itemText = computed(() => {
		const val = this.value();

		if (typeof val === 'string') {
			return val;
		}

		return val ? val.name : this.label() || '';
	});

	/**
	 * Цвет иконки элемента.
	 *
	 * @description
	 * Вычисляемое значение цвета иконки
	 * на основе состояния элемента.
	 */
	public readonly iconColor = computed(() => {
		if (this.isDisabled()) {
			return Colors.IconDisabled;
		}

		if (this.isDestructive()) {
			return this.state() === StateTypes.Default
				? Colors.IconAction
				: Colors.IconError;
		}

		return Colors.IconAction;
	});

	/**
	 * Цвет текста элемента.
	 *
	 * @description
	 * Вычисляемое значение цвета текста
	 * на основе состояния элемента.
	 */
	public readonly textColor = computed(() => {
		if (this.isDisabled()) {
			return Colors.TextDisabled;
		}

		if (this.isDestructive()) {
			return this.state() === StateTypes.Default
				? Colors.TextBody2
				: Colors.TextError;
		}

		return Colors.TextBody2;
	});

	/**
	 * Константы для типов текста.
	 */
	protected readonly TextType = TextType;

	/**
	 * Константы для весов текста.
	 */
	protected readonly TextWeight = TextWeight;

	/**
	 * Константы для типов состояний.
	 */
	protected readonly StateTypes = StateTypes;

	/**
	 * Обработчик клика по элементу.
	 *
	 * @description
	 * Эмитит значение элемента при клике.
	 */
	@HostListener('click')
	public togglePopover(): void {
		this.valueEvent.emit(this.value());
	}

	/**
	 * Проверяет фокус элемента.
	 *
	 * @param event - Событие фокуса.
	 * @description
	 * Обновляет состояние элемента
	 * при получении фокуса.
	 */
	public checkFocus(event: FocusEvent): void {
		const target = event.target as HTMLElement;

		if (target.matches(':focus-visible')) {
			this.state.set(StateTypes.Focused);
		}
	}
}
