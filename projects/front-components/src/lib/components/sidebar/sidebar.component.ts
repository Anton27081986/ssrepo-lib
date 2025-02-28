import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject, input,
  Input, InputSignal, output, Output, signal,
  TemplateRef, WritableSignal
} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {ButtonType, IconType, IDictionaryItemDto, IMenu} from '../../shared/models';
import {SidebarType} from '../../shared/models/enums/sidebar-type';
import {CanvasState} from '../canvas/canvas.state';
import {DividerComponent} from '../divider/divider.component';
import { ButtonComponent } from '../buttons/button/button.component';
import {NavButtonComponent} from '../nav-icon-button/nav-button.component';
import {NavButton} from '../../shared/models/enums/nav-button';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'ss-lib-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [
    NgIf,
    DividerComponent,
    ButtonComponent,
    NgForOf,
    NavButtonComponent,
  ],
  animations: [ trigger('animationTrigger', [
    transition('void => *', [
      style({ opacity: 0 }),
      animate('1s', style({ opacity: 1 })),
    ]),
    transition('* => void', [
      animate('0s', style({ opacity: 0 })),
    ]),
  ])],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SidebarComponent {
  @Input() public topMenuTemplateRef: TemplateRef<any> | null = null;
  public menu: InputSignal<IMenu[]> = input.required<IMenu[]>();

  public outMenuFromSidebar = output<IMenu>()

  protected stateCanvas: CanvasState = inject(CanvasState)

  protected readonly ButtonType = ButtonType;
  protected readonly IconType = IconType;
  protected readonly SidebarType = SidebarType;

  protected sidebarType = this.stateCanvas.sidebarType;

  public closeMenu() {
    this.stateCanvas.sidebarType.set(SidebarType.Close)
  }

  public outMenuModel(menu: IMenu) {
    if(!menu.pressed) {
      const pressed = this.menu().find(item => item.pressed);
      if(pressed) {
        pressed.pressed = false;
      }
      this.outMenuFromSidebar.emit(menu)
    }
  }

  protected readonly NuvButtonType = NavButton;
}
