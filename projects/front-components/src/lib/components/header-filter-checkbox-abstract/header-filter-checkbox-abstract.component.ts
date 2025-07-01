import {
	Component,
	input,
	InputSignal,
	output,
	OutputEmitterRef,
	signal,
	WritableSignal,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
	Observable,
	switchMap,
	merge,
	of,
	shareReplay,
	Subscription,
	tap,
	debounceTime,
} from 'rxjs';
import { IFilterCriterionType } from '../../shared/models';

@Component({ template: '' })
export abstract class HeaderFilterCheckboxSearchAbstractComponent<T> {
	public field: InputSignal<string> = input.required();
	public valueEmit: OutputEmitterRef<IFilterCriterionType> = output();

	public subscribers: Subscription[] = [];
	public queryControl: FormControl<string | null> = new FormControl<
		string | null
	>(null);

	public isLoader: WritableSignal<boolean> = signal(false);

	protected items$: Observable<T[]> = merge(
		of(null),
		this.queryControl.valueChanges,
	).pipe(
		tap(() => this.isLoader.set(true)),
		debounceTime(1000),
		switchMap((value) => {
			return this.search$(value);
		}),
		tap(() => this.isLoader.set(false)),
		shareReplay({
			bufferSize: 1,
			refCount: true,
		}),
	);

	public abstract search$(query: string | null): Observable<T[]>;

	public abstract getList$(query: string): Observable<T[]>;

	public abstract searchActive$(ids: number[]): Observable<T[]>;
}
