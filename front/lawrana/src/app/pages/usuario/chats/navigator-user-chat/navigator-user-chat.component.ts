import { Component, Input, signal, computed } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { ChatItem } from '../user-chat/user-chat.component';
import { ListarUserChatComponent } from '../listar-user-chat/listar-user-chat.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-navigator-user-chat',
  standalone: true,
  imports: [MatSidenavModule, RouterModule, ListarUserChatComponent, MatToolbarModule, MatIcon, MatButton],
  templateUrl: './navigator-user-chat.component.html',
  styleUrl: './navigator-user-chat.component.css'
})
export class NavigatorUserChatComponent {
  navChatItems = signal<ChatItem[]>([
    {
      icon: 'dashboard',
      label: 'Chat 1',
      route: 'chat'
    },
    {
      icon: 'people',
      label: 'Chat 2',
      route: 'chat'
    },
  ]);

  collapsed = signal(false)

  sideNavWidth = computed(() =>
    this.collapsed() ? '65px' : '250px'
  );

  constructor(){

  }
}
