import { Component, Input } from '@angular/core';
import { Chat } from '../../../../interfaces/chat';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

export type ChatItem = {
  icon: string;
  label: string;
  route: string;
}


@Component({
  selector: 'app-user-chat',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule, MatFormFieldModule, MatInputModule, MatIconModule, MatTooltipModule],
  templateUrl: './user-chat.component.html',
  styleUrl: './user-chat.component.scss'
})
export class UserChatComponent {
  @Input() chat: Chat = {
    codigo_chat: '',
    criado_em: '12/06/2024',
    foto_assistente: 'foto',
    nome: 'Nome do chat',
    nome_assistente: 'Nome do assistente'
  }
}
