import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-stand',
	standalone: true,
	imports: [RouterOutlet],
	providers: [RouterOutlet],
	templateUrl: './stand.component.html',
	styleUrl: './stand.component.scss',
	encapsulation: ViewEncapsulation.None,
})
export class StandComponent {}
