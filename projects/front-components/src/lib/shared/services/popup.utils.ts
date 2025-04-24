export enum OptionType {
	None = 'none',
	Some = 'some',
}

export type None = { type: OptionType.None };
export type Some<T> = { type: OptionType.Some; value: T };
export type Option<T> = None | Some<T>;

const _none: None = { type: OptionType.None };
const _some = <T>(value: T): Some<T> => ({
	type: OptionType.Some,
	value,
});

export function optionalDefined<T>(value: T | null | undefined): Option<T> {
	return _toOptional(
		<U>(arg: U | undefined | null): arg is U =>
			arg !== null && arg !== undefined,
	)(value);
}

/** Private functions area */

function _toOptional<I, O extends I>(fn: (i: I) => i is O) {
	return function (arg: I): Option<O> {
		try {
			return fn(arg) ? _some(arg) : _none;
		} catch (err) {
			console.error(err);

			return _none;
		}
	};
}

export function unwrapExpect<T>(opt: Option<T>, msg: string): T {
	if (opt.type === OptionType.Some) {
		return opt.value;
	}

	throw new Error(msg);
}
