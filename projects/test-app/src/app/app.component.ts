import { Component } from '@angular/core';
import { appImports } from './app.imports';
import { IconType } from '../../../front-components/src/lib/models/enums/icon-type';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [appImports],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected readonly IconType = IconType;
}
