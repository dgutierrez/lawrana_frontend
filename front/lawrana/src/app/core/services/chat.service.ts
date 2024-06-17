import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chat } from '../../interfaces/chat';

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

}
