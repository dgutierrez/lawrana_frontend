import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, map, tap, throwError } from 'rxjs';
import { Chat } from '../../interfaces/chat';
import { Mensagem } from '../../interfaces/mensagem';

interface ListaChatsResponse {
  data: Chat[]
}

interface DetalheChatsResponse {
  data: Chat
}

interface MensagemChatsResponse {
  data: Mensagem
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {

  }

  private eventoNotificacao = new Subject<any>();
  eventoNotificacao$ = this.eventoNotificacao.asObservable();

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
        //console.log('Response completo:', response);
      }),
      map(response => {
        // Verifique se a estrutura de resposta está correta
        const chats = response.body?.data || [];
        //console.log('chats mapeados:', chats);
        return chats;
      })
    );
  }

  buscarChat(idChat: string): Observable<Chat>{
    return this.http.get<DetalheChatsResponse>(`${this.apiUrl}/chat/${idChat}`, { observe: 'response' })
    .pipe(
      tap(response => {
        //console.log('Response completo:', response);
      }),
      map(response => {
        if (response.body && response.body.data) {
          const chat = response.body.data;
          //console.log('chat mapeado:', chat);
          return chat;
        } else {
          //console.error('Formato de resposta inesperado:', response);
          throw new Error('Formato de resposta inesperado ou chat não encontrado');
        }
      })
    );
  }

  enviarMensagem(idChat: string, mensagem: string): Observable<Mensagem>{
    const post = {
      codigo_chat: idChat,
      mensagem: mensagem
    }

    return this.http.post<MensagemChatsResponse>(`${this.apiUrl}/mensagem`, post, { observe: 'response' })
    .pipe(
      tap(response => {
        //console.log('Response completo:', response);
      }),
      map(response => {
        if (response.body && response.body.data) {
          const chat = response.body.data;
          //console.log('mensagem mapeado:', chat);
          return chat;
        } else {
          //console.error('Formato de resposta inesperado:', response);
          throw new Error('Formato de resposta inesperado ou mensagem não encontrado');
        }
      }),
      catchError(error => {
        console.error('Erro ao buscar usuarios:', error);
        return throwError(error);
      })
    );
  }

  deletarChat(idChat: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/chat/${idChat}`, { observe: 'response' })
    .pipe(
      tap(response => {
        //console.log('Response completo:', response);
        this.eventoNotificacao.next(idChat);
      })
    );
  }
}
