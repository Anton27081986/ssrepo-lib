import type { InputSignal } from "@angular/core";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { TextComponent } from "../text/text.component";
import {
	ButtonType,
	Colors,
	ExtraSize,
	Shape,
	TextType,
	TextWeight,
} from "../../shared/models";

/**
 * Параметры:
 *
 * [displaySpinnerText]: <boolean> - Показать надпись "Загрузка...". По умолчанию: `false`
 *
 */
@Component({
	selector: "ss-lib-spinner",
	templateUrl: "./spinner.component.html",
	styleUrls: ["./spinner.component.scss"],
	imports: [TextComponent],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
	public displaySpinnerText: InputSignal<boolean> = input<boolean>(false);

	protected readonly TextType = TextType;
	protected readonly TextWeight = TextWeight;
	protected readonly ExtraSize = ExtraSize;
	protected readonly ButtonType = ButtonType;
	protected readonly Shape = Shape;
	protected readonly Colors = Colors;
}
