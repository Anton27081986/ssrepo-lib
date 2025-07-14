import type { WritableSignal } from '@angular/core';
import { Injectable } from '@angular/core';
import { EMPTY_STATE } from '../constants';
import type { IStateElement } from '../models';
import { StateTypes } from '../models';

@Injectable({ providedIn: 'root' })
export class ElementStateService {
	public checkFocus(
		event: Event,
		state: WritableSignal<IStateElement>,
	): void {
		const target = event.target as HTMLElement;

		if (target.matches(':focus-visible')) {
			this.updateState(state, StateTypes.Focused, true);
		}
	}

	public updateState(
		state: WritableSignal<IStateElement>,
		stateType: StateTypes,
		stateValue: boolean,
	): void {
		if (!stateValue) {
			state().pressed
				? state.set({
						...state(),
						pressed: false,
					})
				: state.set(EMPTY_STATE);

			return;
		}

		state.set({
			...EMPTY_STATE,
			default: false,
			hover: state().hover,
			[stateType.toLowerCase() as keyof IStateElement]: stateValue,
		});
	}
}
