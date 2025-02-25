import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TextComponent} from '../text/text.component';
import {ButtonType, ExtraSize, TextType, TextWeight} from '../../shared/models';
import {CloseButtonComponent} from '../buttons';

@Component({
  selector: 'ss-lib-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  imports: [
    TextComponent,
    CloseButtonComponent
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SpinnerComponent {
  protected readonly TextType = TextType;
  protected readonly TextWeight = TextWeight;
  protected readonly ExtraSize = ExtraSize;
  protected readonly ButtonType = ButtonType;
}
