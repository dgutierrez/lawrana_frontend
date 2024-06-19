import { Mensagem } from './../../../../interfaces/mensagem';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { Chat } from '../../../../interfaces/chat';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../../core/services/chat.service';
import { FormsModule } from '@angular/forms';

export type ChatItem = {
  icon: string;
  label: string;
  route: string;
  data: string;
}


@Component({
  selector: 'app-user-chat',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule, MatFormFieldModule, MatInputModule, MatIconModule, MatTooltipModule, NgFor, CommonModule, FormsModule],
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

  mensagem: string = ''

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

    if (!this.chat.mensagens) {
      this.chat.mensagens = [];
    }

    let agora = new Date();

    let novaMsg: Mensagem = {
      codigo_mensagem: '1',
      data_mensagem: agora.toISOString(),
      mensagem: this.mensagem,
      tipo_mensagem: 'Usuario'
    }

    this.chat.mensagens!.push(novaMsg);

    this.chatService.enviarMensagem(this.chat.codigo_chat!, this.mensagem).subscribe({
      next: (value : Mensagem) => {
        console.log('mensagem criada', value);
        this.chat.mensagens!.push(value)
      },
      error: (err) => {
        console.log('exception...', err);
      }
    });
    this.mensagem = ''
  }

  buscarChat(){

  }

}
