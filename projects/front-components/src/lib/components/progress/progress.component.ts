import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal, Signal,
  signal,
  WritableSignal
} from '@angular/core';
import {ProgressStateType} from '../../shared/models/types/progress-state-type';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {CanvasState} from '../canvas/canvas.state';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'ss-lib-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  imports: [],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ trigger('state', [
    state('default', style({ width: '75%' })),
    state('average', style({ width: '75%' })),
    state('max', style({ width: '100%' })),
    transition(
      '* <=> *',
      animate('0.5s')
    ),
  ]),],
})
export class ProgressComponent {
  private readonly canvasState: CanvasState = inject(CanvasState);
  public inProgressType: Signal<ProgressStateType> = toSignal(this.canvasState.inProgressType$, { initialValue: 'default' });

  public state: Signal<ProgressStateType> = computed(() => {
    if(this.inProgressType()) {
      return 'average'
    } else {

    }
    return  'max'
  })
}
