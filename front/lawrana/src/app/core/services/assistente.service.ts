import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Assistente } from '../../interfaces/assistente';
import { Observable, tap, map, catchError, throwError } from 'rxjs';
import { UsuarioService } from './usuario.service';
import { UsuarioTokenService } from './usuario-token.service';

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
    private userTokenService: UsuarioTokenService
  ) { }

  ngOnInit(): void {

  }

  criarAssistente(assistente: Assistente): Observable<Assistente>{
    this.token = this.userTokenService.buscarToken()
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
    console.log('Enviando post para assistente')
    console.log(this.token)
    console.log(assistente)
    return this.http.post<Assistente>(`${this.apiUrl}/assistente`, assistente, { headers })
  }

  listarAssistentes(): Observable<Assistente[]>{
    this.token = this.userTokenService.buscarToken()
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })

    return this.http.get<ListaAssistentesResponse>(`${this.apiUrl}/assistente`, { headers, observe: 'response' })
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
    this.token = this.userTokenService.buscarToken()
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })

    return this.http.get<BuscaAssistenteResponse>(`${this.apiUrl}/assistente/${id}`, { headers, observe: 'response' })
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
    this.token = this.userTokenService.buscarToken()
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })

    return this.http.put<Assistente>(`${this.apiUrl}/assistente/${assistente.codigo_assistente}`, assistente, { headers })
  }
}
