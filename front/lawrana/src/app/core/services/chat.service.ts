import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Chat } from '../../interfaces/chat';

interface ListaChatsResponse {
  data: Chat[]
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

}
