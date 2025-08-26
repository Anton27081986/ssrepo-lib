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
 * Компонент спиннера загрузки с опциональным текстом
 *
 * @example
 * ```html
 * Параметры:
 *
 * [displaySpinnerText]: boolean - Флаг отображения текста загрузки -
 * необязательный, по умолчанию: false
 *
 * [spinnerText]: string - Текст загрузки - необязательный, по умолчанию: 'Загрузка...'
 *
 * <ss-lib-spinner
 *   [displaySpinnerText]="true"
 * ></ss-lib-spinner>
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
	public readonly displaySpinnerText = input<boolean>(false);
	public readonly spinnerText = input<string>('Загрузка...');

	protected readonly TextType = TextType;
	protected readonly TextWeight = TextWeight;
	protected readonly ExtraSize = ExtraSize;
	protected readonly ButtonType = ButtonType;
	protected readonly Shape = Shape;
	protected readonly Colors = Colors;
}
