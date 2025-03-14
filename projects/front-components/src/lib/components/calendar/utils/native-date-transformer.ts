import { CalendarDay } from '../models';

export function fromControlValue(
	controlValue: Date | null,
): CalendarDay | null {
	return controlValue && CalendarDay.fromLocalNativeDate(controlValue);
}

export function toControlValue(
	componentValue: CalendarDay | null,
): Date | null {
	return componentValue?.toLocalNativeDate() || null;
}
