import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Assistente } from '../../interfaces/assistente';
import { Observable, tap, map, catchError, throwError } from 'rxjs';
import { UsuarioService } from './usuario.service';
import { UsuarioTokenService } from './usuario-token.service';
import { Router } from '@angular/router';

interface ListaAssistentesResponse {
  data: Assistente[];
}

interface BuscaAssistenteResponse {
  data: Assistente;
}

@Injectable({
  providedIn: 'root'
})
export class AssistenteService implements OnInit {

  private apiUrl = environment.apiUrl;
  private token: string = ''
  constructor(private http: HttpClient,
    private userTokenService: UsuarioTokenService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  criarAssistente(assistente: Assistente): Observable<Assistente>{
    return this.http.post<Assistente>(`${this.apiUrl}/assistente`, assistente)
  }

  listarAssistentes(): Observable<Assistente[]>{
    return this.http.get<ListaAssistentesResponse>(`${this.apiUrl}/assistente`, { observe: 'response' })
      .pipe(
        tap(response => {
          console.log('Response completo:', response);
        }),
        map(response => {
          // Verifique se a estrutura de resposta está correta
          const assistentes = response.body?.data || [];
          console.log('Assistentes mapeados:', assistentes);
          return assistentes;
        })
      );
  }

  buscarAssistente(id: string): Observable<Assistente>{
    return this.http.get<BuscaAssistenteResponse>(`${this.apiUrl}/assistente/${id}`, { observe: 'response' })
      .pipe(
        tap(response => {
          console.log('Response completo:', response);
        }),
        map(response => {
          if (response.body && response.body.data) {
            const assistente = response.body.data;
            console.log('Assistente mapeado:', assistente);
            return assistente;
          } else {
            console.error('Formato de resposta inesperado:', response);
            throw new Error('Formato de resposta inesperado ou assistente não encontrado');
          }
        }),
        catchError(error => {
          console.error('Erro ao buscar assistente:', error);
          return throwError(error);
        })
      );
  }

  alterarAssistente(assistente: Assistente): Observable<Assistente>{
    return this.http.put<Assistente>(`${this.apiUrl}/assistente/${assistente.codigo_assistente}`, assistente)
  }

  deletarAssistente(id: string): Observable<any> {
    return this.http.delete<Assistente>(`${this.apiUrl}/assistente/${id}`)
  }
}
