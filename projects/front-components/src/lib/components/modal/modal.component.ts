import { ChangeDetectionStrategy, Component, input, TemplateRef } from '@angular/core';
import { Colors, TextComponent, TextType, TextWeight } from 'front-components';
import { CloseButtonComponent } from '../buttons';
import { ButtonType, ExtraSize, IconType, IModalConfig, Orientation } from '../../shared/models';
import { BadgeComponent } from '../badge/badge.component';
import { DividerComponent } from '../divider/divider.component';
import { NgClass, NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'ss-lib-modal',
    standalone: true,
    imports: [
        TextComponent,
        CloseButtonComponent,
        BadgeComponent,
        DividerComponent,
        NgClass,
        NgTemplateOutlet,
    ],
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
    public title = input.required<string>();
    public description = input<string | null>(null);
    public icon = input<IconType | null>(null);
    public contentRef = input<TemplateRef<any> | undefined>(undefined);
    public footerRef = input<TemplateRef<any> | undefined>(undefined);
    public modalConfig = input<IModalConfig>({
        headerOrientation: Orientation.Horizontal,
        showHeaderPadding: true,
        showHeaderDivider: true,
        showFooterDivider: true
    })

    protected readonly TextType = TextType;
    protected readonly TextWeight = TextWeight;
    protected readonly Colors = Colors;
    protected readonly ButtonType = ButtonType;
    protected readonly ExtraSize = ExtraSize;
    protected readonly IconType = IconType;
}
