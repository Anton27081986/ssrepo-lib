import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Input,
  TemplateRef
} from '@angular/core';
import {NgIf, NgTemplateOutlet} from '@angular/common';
import {ButtonType, IconType} from '../../shared/models';
import {SidebarType} from '../../shared/models/enums/sidebar-type';
import {CanvasState} from '../canvas/canvas.state';
import {DividerComponent} from '../divider/divider.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ButtonComponent } from '../buttons/button/button.component';

@Component({
  selector: 'ss-lib-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [
    NgTemplateOutlet,
    NgIf,
    DividerComponent,
    ButtonComponent
  ],
  animations: [
    trigger('expandedPanel', [
      state('close', style({width: '0'})),
      state('mini', style({width: '64px'})),
      state('full', style({width: '240px'})),
      transition('* => *', animate('0.3s')),
    ]),
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SidebarComponent {
  @Input() public topMenuTemplateRef: TemplateRef<any> | null = null;

  protected stateCanvas: CanvasState = inject(CanvasState)

  protected readonly ButtonType = ButtonType;
  protected readonly IconType = IconType;
  protected readonly SidebarType = SidebarType;

  protected sidebarType = this.stateCanvas.sidebarType;


  constructor() {
    effect(() => {
      switch (this.stateCanvas.sidebarType()) {
        case SidebarType.Full:
          return 'full';
        case SidebarType.Close:
          return 'close';
        case SidebarType.Mini:
          return 'mini';
      }
    });
  }

  public closeMenu() {
    this.stateCanvas.sidebarType.set(SidebarType.Close)
  }
}
