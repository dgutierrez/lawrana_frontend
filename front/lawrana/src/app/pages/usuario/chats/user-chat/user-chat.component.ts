import { Component, Input, NgModule } from '@angular/core';
import { Chat } from '../../../../interfaces/chat';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Mensagem } from '../../../../interfaces/mensagem';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';

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
export class UserChatComponent {
  @Input() chat: Chat = {
    codigo_chat: '',
    codigo_assistente: '',
    criado_em: '12/06/2024',
    foto_assistente: 'foto',
    nome_chat: 'Nome do chat',
    nome_assistente: 'Nome do assistente'
  }

  mensagens: Mensagem[] = [
    {
      data_mensagem: '2024-13-06 08:01',
      texto_mensagem: 'mensagem 1',
      tipo_mensagem: 'usuario'
    },
    {
      data_mensagem: '2024-13-06 08:02',
      texto_mensagem: 'mensagem 1 assistente',
      tipo_mensagem: 'assistente'
    },
    {
      data_mensagem: '2024-13-06 08:03',
      texto_mensagem: 'mensagem 2',
      tipo_mensagem: 'usuario'
    },
    {
      data_mensagem: '2024-13-06 08:04',
      texto_mensagem: 'mensagem 2 assistente',
      tipo_mensagem: 'assistente'
    },
    {
      data_mensagem: '2024-13-06 08:05',
      texto_mensagem: 'mensagem 3',
      tipo_mensagem: 'usuario'
    },
    {
      data_mensagem: '2024-13-06 08:06',
      texto_mensagem: 'mensagem 3 assistente',
      tipo_mensagem: 'assistente'
    },
    {
      data_mensagem: '2024-13-06 08:01',
      texto_mensagem: 'mensagem 1',
      tipo_mensagem: 'usuario'
    },
    {
      data_mensagem: '2024-13-06 08:02',
      texto_mensagem: 'mensagem 1 assistente',
      tipo_mensagem: 'assistente'
    },
    {
      data_mensagem: '2024-13-06 08:03',
      texto_mensagem: 'mensagem 2',
      tipo_mensagem: 'usuario'
    },
    {
      data_mensagem: '2024-13-06 08:04',
      texto_mensagem: 'mensagem 2 assistente',
      tipo_mensagem: 'assistente'
    },
    {
      data_mensagem: '2024-13-06 08:05',
      texto_mensagem: 'mensagem 3',
      tipo_mensagem: 'usuario'
    },
    {
      data_mensagem: '2024-13-06 08:06',
      texto_mensagem: 'mensagem 3 assistente',
      tipo_mensagem: 'assistente'
    },
    {
      data_mensagem: '2024-13-06 08:01',
      texto_mensagem: 'mensagem 1',
      tipo_mensagem: 'usuario'
    },
    {
      data_mensagem: '2024-13-06 08:02',
      texto_mensagem: 'mensagem 1 assistente',
      tipo_mensagem: 'assistente'
    },
    {
      data_mensagem: '2024-13-06 08:03',
      texto_mensagem: 'mensagem 2',
      tipo_mensagem: 'usuario'
    },
    {
      data_mensagem: '2024-13-06 08:04',
      texto_mensagem: 'mensagem 2 assistente',
      tipo_mensagem: 'assistente'
    },
    {
      data_mensagem: '2024-13-06 08:05',
      texto_mensagem: 'mensagem 3',
      tipo_mensagem: 'usuario'
    },
    {
      data_mensagem: '2024-13-06 08:06',
      texto_mensagem: 'mensagem 3 assistente',
      tipo_mensagem: 'assistente'
    },
    {
      data_mensagem: '2024-13-06 08:01',
      texto_mensagem: 'mensagem 1',
      tipo_mensagem: 'usuario'
    },
    {
      data_mensagem: '2024-13-06 08:02',
      texto_mensagem: 'mensagem 1 assistente',
      tipo_mensagem: 'assistente'
    },
    {
      data_mensagem: '2024-13-06 08:03',
      texto_mensagem: 'mensagem 2',
      tipo_mensagem: 'usuario'
    },
    {
      data_mensagem: '2024-13-06 08:04',
      texto_mensagem: 'mensagem 2 assistente',
      tipo_mensagem: 'assistente'
    },
    {
      data_mensagem: '2024-13-06 08:05',
      texto_mensagem: 'mensagem 3',
      tipo_mensagem: 'usuario'
    },
    {
      data_mensagem: '2024-13-06 08:06',
      texto_mensagem: 'mensagem 3 assistente',
      tipo_mensagem: 'assistente'
    }
  ]

  newMessage: string = '';

  sendMessage() {
    'ok'
  }


}
