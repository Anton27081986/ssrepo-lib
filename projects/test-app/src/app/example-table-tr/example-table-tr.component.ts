import { Component } from '@angular/core';
import { standImports } from '../stand/stand.imports';
import { ColumnsStateService } from '../../../../front-components/src/lib/components';

@Component({
	selector: 'app-example-table-tr',
	standalone: true,
	imports: [standImports],
	providers: [ColumnsStateService],
	templateUrl: './stand.component.html',
	styleUrl: './stand.component.scss',
})
export class ExampleTableTrComponent {}
