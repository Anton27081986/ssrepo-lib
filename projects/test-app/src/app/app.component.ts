import { Component } from '@angular/core';
import { appImports } from './app.imports';
import { IconType, TextType, TextWeight } from '../../../front-components/src/lib/models';
import { Colors } from '../../../front-components/src/lib/models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [appImports],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected readonly IconType = IconType;
  protected readonly Colors = Colors;
  protected readonly TextType = TextType;
  protected readonly TextWeight = TextWeight;
}
