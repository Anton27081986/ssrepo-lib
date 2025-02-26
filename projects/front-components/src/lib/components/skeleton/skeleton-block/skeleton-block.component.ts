import {ChangeDetectionStrategy, Component, input, InputSignal} from '@angular/core';
import {SkeletonConf} from '../../../shared/models/interfaces/skeleton';

@Component({
  selector: 'ss-lib-skeleton-block',
  templateUrl: './skeleton-block.component.html',
  styleUrls: ['./skeleton-block.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SkeletonBlockComponent {
  public config: InputSignal<SkeletonConf> = input.required<SkeletonConf>();
}
