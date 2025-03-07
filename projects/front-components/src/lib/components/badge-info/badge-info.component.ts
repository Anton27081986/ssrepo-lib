import {ChangeDetectionStrategy, Component, input, InputSignal, output} from '@angular/core';
import {ButtonType, Colors, ExtraSize, IBadgeProps, IconType, TextType, TextWeight} from '../../shared/models';
import {BadgeComponent} from '../badge/badge.component';
import {TextComponent} from '../text/text.component';
import {NgIf} from '@angular/common';
import {CloseButtonComponent} from '../buttons';

@Component({
  selector: 'ss-lib-badge-info',
  standalone: true,
  imports: [
    BadgeComponent,
    TextComponent,
    CloseButtonComponent,
    NgIf
  ],
  templateUrl: './badge-info.component.html',
  styleUrl: './badge-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeInfoComponent {
  public title: InputSignal<string> = input.required<string>();
  public description: InputSignal<string> = input.required<string>();
  public viewClose: InputSignal<boolean> = input<boolean>(true);
  public badge: InputSignal<IBadgeProps> = input.required<IBadgeProps>();
  public close = output<void>()
  protected readonly ButtonType = ButtonType;
  protected readonly ExtraSize = ExtraSize;
  protected readonly IconType = IconType;
  protected readonly TextType = TextType;
  protected readonly TextWeight = TextWeight;
  protected readonly Colors = Colors;
}
