import {Component, input, InputSignal} from '@angular/core';
import {ExtraSize, IconType, TextType, TextWeight} from '../../shared/models';
import {BadgeComponent} from '../badge/badge.component';
import {TextComponent} from '../text/text.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'ss-lib-empty-state',
  standalone: true,
  imports: [
    BadgeComponent,
    TextComponent,
    NgIf
  ],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss'
})
export class EmptyStateComponent {
  public icon: InputSignal<IconType> = input.required<IconType>();
  public title: InputSignal<string> = input.required();
  public description: InputSignal<string | null> = input<string | null>(null);

  protected readonly TextType = TextType;
  protected readonly TextWeight = TextWeight;
  protected readonly ExtraSize = ExtraSize;
}
