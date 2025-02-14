import {ChangeDetectionStrategy, Component, Input, TemplateRef} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import {ButtonComponent} from '../button/button.component';
import {ButtonType, IconPosition, IconType, Size} from '../../shared/models';
import {CanvasState} from '../canvas/canvas.state';
import {SidebarType} from '../../shared/models/enums/sidebar-type';

@Component({
  selector: 'ss-lib-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    NgTemplateOutlet,
    ButtonComponent
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() public leftMenuTemplateRef: TemplateRef<any> | null = null;
  @Input() public rightMenuTemplateRef: TemplateRef<any> | null = null;

  constructor(private readonly canvasState: CanvasState) {}

  protected readonly ButtonType = ButtonType;
  protected readonly IconType = IconType;
  protected readonly IconPosition = IconPosition;
  protected readonly Size = Size;

  public toggleMenu() {
    if(this.canvasState.sidebarType() === SidebarType.Close) {
      this.canvasState.sidebarType.set(SidebarType.Mini)
    } else if (this.canvasState.sidebarType() === SidebarType.Mini) {
      this.canvasState.sidebarType.set(SidebarType.Full)
    } else {
      this.canvasState.sidebarType.set(SidebarType.Mini)
    }
  }
}
