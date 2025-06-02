import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { IFilter } from '../../../../../test-app/src/app/stand/stand.component';

@Injectable({ providedIn: 'root' })
export class FilterService {
	public filters$: BehaviorSubject<IFilter[]> = new BehaviorSubject<
		IFilter[]
	>([]);

	public activeFilters$: BehaviorSubject<IFilter[]> = new BehaviorSubject<
		IFilter[]
	>([]);

	public readonly formGroupFilter: FormGroup = new FormGroup({});

	public clearAllFilter(): void {
		this.activeFilters$.next([]);
		const oldFilters = this.filters$.value;

		oldFilters.forEach((obj) => {
			obj.active = false;
		});
		this.filters$.next(oldFilters);
	}

	public selectedFilter(filter: IFilter): void {
		filter.active = !filter.active;

		if (filter.active) {
			this.formGroupFilter.addControl(filter.name, new FormControl([]));
		} else {
			this.formGroupFilter.removeControl(filter.name);
		}

		this.activeFilters$.next(
			this.filters$.value.filter((item) => item.active),
		);
	}
}
