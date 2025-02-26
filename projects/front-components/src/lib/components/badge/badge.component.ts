import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
  ViewEncapsulation,
} from '@angular/core';
import {  NgStyle } from '@angular/common'
import {IconComponent} from '../icon/icon.component';
import { ExtraSize, IconType, Shape } from '../../shared/models';
import {BadgeSizeType} from '../../shared/models/types/bange-size-type';

@Component({
  selector: 'ss-lib-badge',
  templateUrl: 'badge.component.html',
  styleUrls: ['badge.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IconComponent,
    NgStyle
  ]
})
export class BadgeComponent {
  public size: InputSignal<BadgeSizeType> = input<BadgeSizeType>(ExtraSize.md);
  public type: InputSignal<Shape> = input<Shape>(Shape.Square);
  public icon = input.required<IconType>();

  public padding: Signal<string> = computed(() => {
    if (this.size() === ExtraSize.lg) {
      return '11px'
    }

    if (this.size() === ExtraSize.xl) {
      return '13px'
    }

    return '9px'
  })
  protected readonly ExtraSize = ExtraSize;
  protected readonly Shape = Shape;
}
