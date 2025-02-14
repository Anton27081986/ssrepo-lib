import {Component} from '@angular/core';
import {CanvasComponent} from '../../../../front-components/src/lib/components/canvas/canvas.component';
import {RouterOutlet} from '@angular/router';
import {Colors, IconType, IMenu, TextType, TextWeight} from '../../../../front-components/src/lib/shared/models';
import {NgForOf} from '@angular/common';
import {IconComponent, TextComponent, ToggleIconComponent} from '../../../../front-components/src/lib/components';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CanvasComponent, RouterOutlet, NgForOf, IconComponent, TextComponent, ToggleIconComponent, ReactiveFormsModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  protected exampleMenu: IMenu[] = [
    {
      title: 'Баннеры',
      toolTip: 'Баннеры',
      link: '',
      pressed: true,
      icon: IconType.Alert
    },
    {
      title: 'Баннеры',
      toolTip: 'Баннеры',
      link: '',
      pressed: true,
      icon: IconType.Alert
    },
  ];

  protected readonly theme: FormControl = new FormControl<boolean>(true)
  protected readonly IconType = IconType;
  protected readonly TextType = TextType;
  protected readonly TextWeight = TextWeight;

  constructor() {
    this.theme.valueChanges.subscribe(val => {
      const elem = document.getElementsByTagName('body');
      console.log()
      if(val) {
        elem[0].classList.add('dark')
      } else {
        elem[0].classList.remove('dark')
      }
    })
  }

  protected readonly Colors = Colors;
}
