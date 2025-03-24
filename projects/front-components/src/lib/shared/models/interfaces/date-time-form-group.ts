import { FormControl } from '@angular/forms';

export interface DateTimeFormGroup {
	date: FormControl<Date | null>;
	time: FormControl<string | null>;
}
