import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { UsuarioService } from './usuario.service';

interface Data {
  token: string;
}

interface UsuarioAuthResponse {
  data: Data;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioAutenticacaoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    private userService: UsuarioService
  ) { }

  autenticar(codigo_empresa: string, email: string, senha: string) : Observable<HttpResponse<UsuarioAuthResponse>>{
    return this.http.post<UsuarioAuthResponse>(`${this.apiUrl}/usuario/login`,
      {
        codigo_empresa,
        email,
        senha
      },
      {
        observe: 'response'
      }
    ).pipe(
      tap((response) => {
        const authToken = response.body?.data.token || ''
        this.userService.salvarToken(authToken);
      })
    )
  }

  csrf() : Observable<string>{
    console.log('usuario-auth.service')
    return this.http.get<Data>(`${this.apiUrl}/api/csrf-token`,
      {
        observe: 'response'
      }
    ).pipe(
      tap(response => {
        console.log('Response completo:', response);
      }),
      map(response => {
        if (response.body && response.body.token) {
          const token = response.body.token;
          console.log('token csrf mapeado:', token);
          this.userService.salvarTokenCSRF(token);
          return token;
        } else {
          console.error('Formato de resposta inesperado:', response);
          throw new Error('Formato de resposta inesperado ou usuarios não encontrado');
        }
      }),
      catchError(error => {
        console.error('Erro ao buscar csrf:', error);
        return throwError(error);
      })
    )
  }
}
