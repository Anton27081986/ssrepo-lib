import {Component, input, InputSignal, TemplateRef} from '@angular/core';
import {ExtraSize, IconType, TextType, TextWeight} from '../../shared/models';
import {BadgeComponent} from '../badge/badge.component';
import {TextComponent} from '../text/text.component';
import {NgIf, NgTemplateOutlet} from '@angular/common';
import {DividerComponent} from '../divider/divider.component';

/**
 * Параметры:
 *
 * [headerTitle]: string - Название в шапке`
 *
 * [actionRef]: TemplateRef<any> | null - template кнопок`
 *
 * [icon]: IconType - Название иконки. Required`
 *
 * [title]: string - title  empty state`
 *
 * [description]: string | null - description empty state`
 */
@Component({
  selector: 'ss-lib-empty-state',
  standalone: true,
  imports: [
    BadgeComponent,
    TextComponent,
    NgIf,
    DividerComponent,
    NgTemplateOutlet
  ],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss'
})
export class EmptyStateComponent {
  public headerTitle: InputSignal<string> = input.required<string>();
  public actionRef: InputSignal<TemplateRef<any> | null> = input.required();
  public icon: InputSignal<IconType> = input.required<IconType>();
  public title: InputSignal<string> = input.required();
  public description: InputSignal<string | null> = input<string | null>(null);

  protected readonly TextType = TextType;
  protected readonly TextWeight = TextWeight;
  protected readonly ExtraSize = ExtraSize;
}
