import { MenuItem } from './../../../shared/meu-sidenav/meu-sidenav.component';
import { Component, signal } from '@angular/core';
import { NavigatorComponent } from '../../../shared/navigator/navigator.component';
import { ViewerComponent } from '../../../shared/viewer/viewer.component';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [NavigatorComponent, ViewerComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent {
  usuarioMenuItems = signal<MenuItem[]>([
    {
      icon: 'people',
      label: 'Assistentes',
      route: 'assistentes'
    },
    {
      icon: 'chat',
      label: 'Chat',
      route: 'chats'
    },
    {
      icon: 'folder_special',
      label: 'Base de conhecimento',
      route: 'chats'
    }
  ])
}
