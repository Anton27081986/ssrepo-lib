import {
    Component,
    inject,
    input,
    OnInit, signal,
} from '@angular/core';
import { NgStyle } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ICONS } from '../../assets/icons';
import { IconType, Colors } from '../../models';

/**
 * Параметры:
 *
 * [icon]: IconType - Название иконки. Обазательное поле
 *
 * [height]: string - Высота. По умолчанию: `24`
 *
 * [width]: string - Ширина. По умолчанию: `24`
 *
 * [color]: Colors - Цвет. По умолчанию: `Colors.IconPrimary`
 */
@Component({
    selector: 'snab-icon',
    standalone: true,
    imports: [
        NgStyle
    ],
    templateUrl: './icon.component.html',
    styleUrl: './icon.component.scss'
})
export class IconComponent implements OnInit {
    private readonly sanitizer = inject(DomSanitizer)

    public icon = input.required<IconType>();
    public height = input<string>('24');
    public width = input<string>('24');
    public color = input<Colors>(Colors.IconPrimary);

    public svg = signal<SafeHtml>('');

    ngOnInit(): void {
        this.setIcon();
    }

    private setIcon(): void {
        const svgData = ICONS.get(this.icon());

        if (svgData) {
            this.svg.set(this.sanitizer.bypassSecurityTrustHtml(svgData));
        }
    }
}
