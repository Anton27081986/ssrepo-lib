import {Component, effect, input, InputSignal, ViewEncapsulation} from '@angular/core';
import {IconComponent} from '../icon/icon.component';
import {IconType, IMenu, TextType, TextWeight} from '../../shared/models';
import {TextComponent} from '../text/text.component';
import {NavButtonType} from '../../shared/models/types/nav-button-type';
import {NuvButtonEnum} from '../../shared/models/enums/nuv-button-enum';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NgIf} from '@angular/common';

@Component({
  selector: 'ss-lib-nuv-icon-button',
  templateUrl: './nuv-button.component.html',
  standalone: true,
  styleUrls: ['./nuv-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [ trigger('expendedPanel', [
    state('view', style({ display: 'flex' })),
    state('hidden', style({ display: 'none' })),
    transition(
      'initial <=> hidden',
      animate('0.3s')
    ),
  ]),],
  imports: [
    IconComponent,
    TextComponent,
     NgIf
  ]
})
export class NuvButtonComponent {
  protected readonly IconType = IconType;
  public type: InputSignal<NavButtonType> = input<NuvButtonEnum>(NuvButtonEnum.NavBase);
  public menu: InputSignal<IMenu> = input.required();

  constructor() {}

  protected readonly NuvButtonType = NuvButtonEnum;
  protected readonly TextType = TextType;
  protected readonly TextWeight = TextWeight;
}
