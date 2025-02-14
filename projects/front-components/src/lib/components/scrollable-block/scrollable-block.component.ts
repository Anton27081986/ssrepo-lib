import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ss-lib-scrollable-block',
  templateUrl: './scrollable-block.component.html',
  standalone: true,
  styleUrls: ['./scrollable-block.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'scrollable-block',
    '[class.scrollable-block--h-hidden]': 'horizontalScroll',
    '[class.scrollable-block--v-hidden]': '!verticalScroll',
    '[class.scrollable-block--not-auto-size]': 'disableAutoSize'
  }
})
export class ScrollableBlockComponent {
  @Input() horizontalScroll: boolean = false;
  @Input() verticalScroll: boolean = false;
  @Input() disableAutoSize: boolean = false;
}
