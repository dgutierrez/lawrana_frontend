import { Component, Input, signal, computed } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChatItem, UserChatComponent } from '../user-chat/user-chat.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Chat } from '../../../../interfaces/chat';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-listar-user-chat',
  standalone: true,
  imports: [MatCardModule, NgFor, NgIf, MatButtonModule, MatIconModule, RouterModule, MatButtonToggleModule, UserChatComponent, MatSlideToggleModule, MatSidenavModule, MatListModule],
  templateUrl: './listar-user-chat.component.html',
  styleUrl: './listar-user-chat.component.css'
})
export class ListarUserChatComponent {
  @Input() chatItems = signal<ChatItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'chat',
      data: '13/06/2024'
    },
    {
      icon: 'people',
      label: 'Assistentes',
      route: 'chat',
      data: '12/06/2024'
    },
  ])



  chats : Chat[] = [{
    criado_em: '12/06/2024',
    foto_assistente: 'foto',
    nome: 'Nome Chat Mock',
    nome_assistente: 'Nome assistente mock'
  },
  {
    criado_em: '11/06/2024',
    foto_assistente: 'foto',
    nome: 'Nome Chat Mock 2',
    nome_assistente: 'Nome assistente mock 2'
  }]

  sideNavWidth = computed(() =>
    '250px'
  );
}
