import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  ViewEncapsulation,
} from '@angular/core';
import {DividerType} from '../../shared/models/enums/divider-type';


/**
 * Параметры:
 *
 * [direction]: 'vertical' | 'horizontal' - direction. По умолчанию: `horizontal`
 */
@Component({
  selector: 'ss-lib-divider',
  template: `
    <div
        class="divider"
        [class.divider--horizontal]="direction() === 'horizontal'"
        [class.divider--vertical]="direction() === 'vertical'"
    ></div>
  `,
  styleUrls: ['divider.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerComponent {
  public direction: InputSignal<DividerType> = input<DividerType>(DividerType.Horizontal);
}
