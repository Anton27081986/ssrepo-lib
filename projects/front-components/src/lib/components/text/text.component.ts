import { Component, input } from '@angular/core';
import { NgClass } from "@angular/common";
import { Colors, TextType, TextWeight } from '../../shared/models';

/**
 * Параметры:
 *
 * [type]: TextType - Размерность шрифта. По умолчанию: `TextType.Body`
 *
 * [weight]: TextWeight - Толщина шрифта. По умолчанию: `TextWeight.Regular`
 *
 * [color]: Colors - Цвет текста. По умолчанию: `Colors.Primary`
 *
 * [isEllipsis]: boolean - Добавлять троеточие при переполнении. По умолчанию: `false`
 */
@Component({
    selector: 'ss-lib-text',
    templateUrl: './text.component.html',
    styleUrls: ['./text.component.scss'],
    imports: [NgClass],
    standalone: true
})
export class TextComponent {
    public type = input<TextType>(TextType.BodyMd);
    public weight = input<TextWeight>(TextWeight.Regular);
    public color = input<Colors>(Colors.TextHeadings);
    public isEllipsis = input<boolean>(false);
    public isUnderline = input<boolean>(false);
}
