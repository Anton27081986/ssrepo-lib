import { Component } from '@angular/core';
import { FrontComponentsComponent } from '../../../front-components/src/lib/components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FrontComponentsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'test-app';
}
