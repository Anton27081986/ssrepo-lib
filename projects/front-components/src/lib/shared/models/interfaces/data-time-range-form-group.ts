import { FormControl } from '@angular/forms';

export interface DataTimeRangeFormGroup {
	start: FormControl<null | Date>;
	end: FormControl<null | Date>;
}
