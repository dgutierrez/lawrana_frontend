import { Component, Input, signal, computed, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChatItem, UserChatComponent } from '../user-chat/user-chat.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Chat } from '../../../../interfaces/chat';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ChatService } from '../../../../core/services/chat.service';

@Component({
  selector: 'app-listar-user-chat',
  standalone: true,
  imports: [MatCardModule, NgFor, NgIf, MatButtonModule, MatIconModule, RouterModule, MatButtonToggleModule, UserChatComponent, MatSlideToggleModule, MatSidenavModule, MatListModule],
  templateUrl: './listar-user-chat.component.html',
  styleUrl: './listar-user-chat.component.scss'
})
export class ListarUserChatComponent implements OnInit {
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

  chats : Chat[] = []

  constructor(private chatService: ChatService,
    private router: Router){

  }

  ngOnInit(): void {
    this.listarChats();

    this.chatService.eventoNotificacao$.subscribe((evento) => {
      console.log('Evento recebido:', evento);
      // Lógica para tratar o evento
      this.listarChats();
    });
  }

  listarChats(){
    this.chatService.listarChats().subscribe((response: Chat[]) => {
      this.chats = response;
    });
  }

  abrirChat(id: string){
    console.log('abrindo chat: ' + id)
    this.router.navigate([`usuario/chats/chat/${id}`]);
  }

  sideNavWidth = computed(() =>
    '250px'
  );
}
