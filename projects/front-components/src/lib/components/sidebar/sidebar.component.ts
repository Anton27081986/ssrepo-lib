import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject, input,
  Input, InputSignal,
  TemplateRef
} from '@angular/core';
import {NgForOf, NgIf, NgTemplateOutlet} from '@angular/common';
import {ButtonType, IconType, IMenu} from '../../shared/models';
import {SidebarType} from '../../shared/models/enums/sidebar-type';
import {CanvasState} from '../canvas/canvas.state';
import {DividerComponent} from '../divider/divider.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ButtonComponent } from '../buttons/button/button.component';
import {NuvButtonComponent} from '../nuv-icon-button/nuv-button.component';
import {NuvButtonEnum} from '../../shared/models/enums/nuv-button-enum';

@Component({
  selector: 'ss-lib-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [
    NgIf,
    DividerComponent,
    ButtonComponent,
    NgForOf,
    NuvButtonComponent
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SidebarComponent {
  @Input() public topMenuTemplateRef: TemplateRef<any> | null = null;
  public menu: InputSignal<IMenu[]> = input.required<IMenu[]>();

  protected stateCanvas: CanvasState = inject(CanvasState)

  protected readonly ButtonType = ButtonType;
  protected readonly IconType = IconType;
  protected readonly SidebarType = SidebarType;

  protected sidebarType = this.stateCanvas.sidebarType;

  public closeMenu() {
    this.stateCanvas.sidebarType.set(SidebarType.Close)
  }

  protected readonly NuvButtonType = NuvButtonEnum;
}
