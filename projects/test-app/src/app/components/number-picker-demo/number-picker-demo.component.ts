import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NumberPickerComponent } from '../../../../../front-components/src/lib/components';
import { ExtraSize } from '../../../../../front-components/src/lib/shared/models';

@Component({
	selector: 'app-number-picker-demo',
	standalone: true,
	template: ` <div class="section">
		<h2 class="section-title">Number Picker</h2>

		<p class="section-description">
			Number input with min and max constraints.
		</p>

		<div class="component-row">
			<div style="width: 148px">
				<ss-lib-number-picker
					[formControl]="numberPickerCtrl"
					[min]="5"
					[max]="1000"
				></ss-lib-number-picker>
			</div>

			<div style="width: 148px">
				<ss-lib-number-picker
					[size]="ExtraSize.md"
					[formControl]="numberPickerCtrl"
					[min]="5"
					[max]="1000"
				></ss-lib-number-picker>
			</div>
		</div>
	</div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NumberPickerComponent, ReactiveFormsModule],
})
export class NumberPickerDemoComponent {
	public numberPickerCtrl = new FormControl(2);

	protected readonly ExtraSize = ExtraSize;
}
