import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
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
}
