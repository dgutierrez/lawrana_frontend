import { Component, Input, NgModule, OnInit } from '@angular/core';
import { Chat } from '../../../../interfaces/chat';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Mensagem } from '../../../../interfaces/mensagem';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../../core/services/chat.service';

export type ChatItem = {
  icon: string;
  label: string;
  route: string;
  data: string;
}


@Component({
  selector: 'app-user-chat',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule, MatFormFieldModule, MatInputModule, MatIconModule, MatTooltipModule, NgFor, CommonModule],
  templateUrl: './user-chat.component.html',
  styleUrl: './user-chat.component.scss'
})
export class UserChatComponent implements OnInit {
  chat: Chat = {
    codigo_chat: '',
    codigo_assistente: '',
    criado_em: '',
    foto_assistente: '',
    nome_chat: '',
    nome_assistente: ''
  }

  chatId: string = ''
  mensagens: Mensagem[] = []

  constructor(private router: Router,
    private route: ActivatedRoute,
    private chatService: ChatService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.chatId = params['id'];
      this.carregarChat(this.chatId);
    });
  }

  carregarChat(id: string){
    //const id = this.route.snapshot.paramMap.get('id')

    console.log('buscando id de chat: ' + id)

    this.chatService.buscarChat(id!).subscribe((response: Chat) => {
      this.chat = response
      this.mensagens = response.mensagens!
    })
  }

  newMessage: string = '';

  sendMessage() {
    'ok'
  }

  buscarChat(){

  }

}
