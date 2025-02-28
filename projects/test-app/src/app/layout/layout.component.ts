import {Component} from '@angular/core';
import {CanvasComponent} from '../../../../front-components/src/lib/components/canvas/canvas.component';
import {RouterOutlet} from '@angular/router';
import {Colors, IconType, IMenu, TextType, TextWeight} from '../../../../front-components/src/lib/shared/models';
import {IconComponent, TextComponent, ToggleIconComponent} from '../../../../front-components/src/lib/components';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {SidebarType} from '../../../../front-components/src/lib/shared/models/enums/sidebar-type';
import {NavButton} from '../../../../front-components/src/lib/shared/models/enums/nav-button';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CanvasComponent, RouterOutlet, IconComponent, TextComponent, ToggleIconComponent, ReactiveFormsModule],
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
      icon: IconType.ImagePlus,
      subMenu: []
    },
    {
      title: 'Баннеры',
      toolTip: 'Баннеры',
      link: '',
      pressed: false,
      icon: IconType.Alert,
      subMenu: []
    },
  ];

  protected readonly theme: FormControl = new FormControl<boolean>(true)
  protected readonly IconType = IconType;
  protected readonly TextType = TextType;
  protected readonly TextWeight = TextWeight;

  constructor() {
    this.theme.valueChanges.subscribe(val => {
      const elem = document.body;
      if(val) {
        elem.classList.add('dark')
      } else {
        elem.classList.remove('dark')
      }
    })
  }


 protected selectedMenu(menu: IMenu) {
    console.log(menu)
    menu.pressed = true;
  }

  protected readonly Colors = Colors;
  protected readonly SidebarType = SidebarType;
  protected readonly NuvButtonType = NavButton;
}
