import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TextComponent } from '../text/text.component';
import {
	ButtonType,
	Colors,
	ExtraSize,
	Shape,
	TextType,
	TextWeight,
} from '../../shared/models';

/**
 * Компонент спиннера загрузки.
 *
 * Предоставляет анимированный индикатор загрузки с возможностью отображения
 * текста. Компонент использует OnPush стратегию обнаружения изменений для
 * оптимизации производительности.
 *
 * @example
 * ```html
 * <ss-lib-spinner [displaySpinnerText]="true"></ss-lib-spinner>
 * ```
 */
@Component({
	selector: 'ss-lib-spinner',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.scss'],
	imports: [TextComponent],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
	/**
	 * Флаг, определяющий отображение текста под спиннером.
	 *
	 * @default false
	 * @description
	 * - true: отображает текст "Загрузка..." под спиннером
	 * - false: показывает только анимированный спиннер
	 */
	public readonly displaySpinnerText = input<boolean>(false);

	/**
	 * Константы для типов текста.
	 * Используются для стилизации текста спиннера.
	 */
	protected readonly TextType = TextType;

	/**
	 * Константы для весов текста.
	 * Определяют толщину шрифта текста спиннера.
	 */
	protected readonly TextWeight = TextWeight;

	/**
	 * Константы для дополнительных размеров.
	 * Используются для настройки размеров компонента.
	 */
	protected readonly ExtraSize = ExtraSize;

	/**
	 * Константы для типов кнопок.
	 * Применяются для стилизации контейнера спиннера.
	 */
	protected readonly ButtonType = ButtonType;

	/**
	 * Константы для форм.
	 * Определяют внешний вид компонента.
	 */
	protected readonly Shape = Shape;

	/**
	 * Константы для цветов.
	 * Используются для настройки цветовой схемы компонента.
	 */
	protected readonly Colors = Colors;
}
