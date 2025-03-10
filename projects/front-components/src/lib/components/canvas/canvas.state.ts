import type { OnDestroy, WritableSignal } from '@angular/core';
import { Injectable, signal } from '@angular/core';
import type { Observable } from 'rxjs';
import { BehaviorSubject, fromEvent, map, startWith, Subscription } from 'rxjs';
import { SidebarType } from '../../shared/models/enums/sidebar-type';
import type { ProgressStateType } from '../../shared/models/types/progress-state-type';

@Injectable({ providedIn: 'root' })
export class CanvasState implements OnDestroy {
	public sidebarType: WritableSignal<SidebarType> = signal(SidebarType.Close);
	public inProgressType$: BehaviorSubject<ProgressStateType> =
		new BehaviorSubject<ProgressStateType>('default');

	private readonly subscription: Subscription = new Subscription();

	public screenWidth$: Observable<number> = fromEvent(window, 'resize').pipe(
		map(() => window.innerWidth),
		startWith(window.innerWidth),
	);

	constructor() {
		this.subscription.add(
			this.screenWidth$.pipe().subscribe((item) => {
				if (item >= 1440) {
					this.sidebarType.set(SidebarType.Full);
				} else {
					this.sidebarType.set(SidebarType.Mini);
				}
			}),
		);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
