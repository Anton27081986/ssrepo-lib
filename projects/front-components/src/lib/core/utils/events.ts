import type { MonoTypeOperatorFunction } from 'rxjs';
import { tap } from 'rxjs';

export function ssPreventDefault<
	T extends Event,
>(): MonoTypeOperatorFunction<T> {
	return tap((event) => event.preventDefault());
}

export function ssStopPropagation<
	T extends Event,
>(): MonoTypeOperatorFunction<T> {
	return tap((event) => event.stopPropagation());
}
