import {Component, input, Input, InputSignal, TemplateRef} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {ScrollableBlockComponent} from '../scrollable-block/scrollable-block.component';
import {CanvasState} from './canvas.state';

@Component({
  selector: 'ss-lib-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
  providers: [CanvasState],
  imports: [
    HeaderComponent,
    SidebarComponent,
    ScrollableBlockComponent,
  ],
  standalone: true
})

export class CanvasComponent {
  @Input() public leftMenuHeaderTemplateRef: TemplateRef<any> | null = null;
  @Input() public rightMenuHeaderTemplateRef: TemplateRef<any> | null = null;
  @Input() public topMenuSidebarTemplateRef: TemplateRef<any> | null = null;

  public contentScrollHorizontal: InputSignal<boolean> = input(false);
  public contentScrollVertical: InputSignal<boolean> = input(true);
}
