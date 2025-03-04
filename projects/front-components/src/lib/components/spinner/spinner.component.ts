import {ChangeDetectionStrategy, Component, input, InputSignal} from '@angular/core';
import {TextComponent} from '../text/text.component';
import {ButtonType, Colors, ExtraSize, Shape, TextType, TextWeight} from '../../shared/models';

@Component({
  selector: 'ss-lib-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  imports: [
    TextComponent
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SpinnerComponent {
  public text: InputSignal<boolean> = input<boolean>(false);

  protected readonly TextType = TextType;
  protected readonly TextWeight = TextWeight;
  protected readonly ExtraSize = ExtraSize;
  protected readonly ButtonType = ButtonType;
  protected readonly Shape = Shape;
  protected readonly Colors = Colors;
}
