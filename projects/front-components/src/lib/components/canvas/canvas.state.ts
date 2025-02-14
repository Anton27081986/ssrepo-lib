import {Injectable, OnDestroy, signal, WritableSignal} from '@angular/core';
import {SidebarType} from '../../shared/models/enums/sidebar-type';
import {fromEvent, map, Observable, skip, startWith, Subscription} from 'rxjs';

@Injectable({providedIn: 'root'})
export class CanvasState implements OnDestroy {
  public sidebarType: WritableSignal<SidebarType> = signal(SidebarType.Close);
  private subscription: Subscription = new Subscription()

  public screenWidth$: Observable<number> = fromEvent(window, 'resize').pipe(
    map(() => window.innerWidth),
    startWith(window.innerWidth) // Начальное значение
  );

  constructor() {
    this.subscription.add(
      this.screenWidth$.pipe().subscribe(item => {
        if (item >= 1440) {
          this.sidebarType.set(SidebarType.Full)
        } else {
          this.sidebarType.set(SidebarType.Mini)
        }
      })
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
