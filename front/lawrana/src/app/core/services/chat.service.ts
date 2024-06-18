import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Chat } from '../../interfaces/chat';

interface ListaChatsResponse {
  data: Chat[]
}

interface DetalheChatsResponse {
  data: Chat
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {

  }

  criarChat(idAssistente: string): Observable<Chat>{
    const novoChat = {
      codigo_assistente: idAssistente
    }

    return this.http.post<Chat>(`${this.apiUrl}/chat`, novoChat);
  }

  listarChats(): Observable<Chat[]>{
    return this.http.get<ListaChatsResponse>(`${this.apiUrl}/chat`, { observe: 'response' })
    .pipe(
      tap(response => {
        console.log('Response completo:', response);
      }),
      map(response => {
        // Verifique se a estrutura de resposta está correta
        const chats = response.body?.data || [];
        console.log('chats mapeados:', chats);
        return chats;
      })
    );
  }

  buscarChat(idChat: string): Observable<Chat>{
    return this.http.get<DetalheChatsResponse>(`${this.apiUrl}/chat/${idChat}`, { observe: 'response' })
    .pipe(
      tap(response => {
        console.log('Response completo:', response);
      }),
      map(response => {
        if (response.body && response.body.data) {
          const chat = response.body.data;
          console.log('chat mapeado:', chat);
          return chat;
        } else {
          console.error('Formato de resposta inesperado:', response);
          throw new Error('Formato de resposta inesperado ou chat não encontrado');
        }
      })
    );
  }

}
