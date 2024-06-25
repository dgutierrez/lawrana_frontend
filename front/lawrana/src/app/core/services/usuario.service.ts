import { Injectable } from '@angular/core';
import { UsuarioTokenService } from './usuario-token.service';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { UsuarioToken } from '../../interfaces/usuarioToken';
import { HttpClient } from '@angular/common/http';
import { NovoUsuario, PerfilUsuario, Usuario, UsuarioPaginador } from '../../interfaces/usuario';
import { environment } from '../../environments/environment';

const KEY = 'lawrana-user-token'

interface ListaEmpresaResponse {
  data: UsuarioPaginador;
}

interface PerfilUsuarioResponse {
  data: PerfilUsuario;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private userSubject = new BehaviorSubject<UsuarioToken | null>(null);
  private apiUrl = environment.apiUrl;

  constructor(private usuarioTokenService : UsuarioTokenService,
    private http: HttpClient) {
    if(this.usuarioTokenService.possuiToken(KEY)){
      this.decodificarJwt();
    }
  }

  decodificarJwt() {
    const token = this.usuarioTokenService.buscarToken(KEY);
    const user = jwtDecode(token) as UsuarioToken;

    this.userSubject.next(user);
  }

  retornarUser() {
    return this.userSubject.asObservable();
  }

  salvarToken(token: string) {
    this.usuarioTokenService.salvarToken(token, KEY);
    this.decodificarJwt();
  }

  logout() {
    this.usuarioTokenService.excluirToken(KEY);
    this.userSubject.next(null);
  }

  estaLogado() {
    return this.usuarioTokenService.possuiToken(KEY);
  }

  buscarToken() {
    return this.usuarioTokenService.buscarToken(KEY);
  }

  listarUsuarios(pagina: number, registros: number): Observable<UsuarioPaginador> {
    return this.http.get<ListaEmpresaResponse>(`${this.apiUrl}/empresa/usuario?pagina=${pagina}&registros=${registros}`, { observe: 'response' })
    .pipe(
      tap(response => {
        console.log('Response completo:', response);
      }),
      map(response => {
        if (response.body && response.body.data) {
          const usuarios = response.body.data;
          console.log('Empresa mapeado:', usuarios);
          return usuarios;
        } else {
          console.error('Formato de resposta inesperado:', response);
          throw new Error('Formato de resposta inesperado ou usuarios não encontrado');
        }
      }),
      catchError(error => {
        console.error('Erro ao buscar usuarios:', error);
        return throwError(error);
      })
    );
  }

  deletarUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/empresa/usuario/${id}`, { observe: 'response' })
    .pipe(
      tap(response => {
        console.log('Response completo:', response);
      }),

      catchError(error => {
        console.error('Erro ao deletar usuarios:', error);
        return throwError(error);
      })
    );
  }

  criarUsuario(user: NovoUsuario): Observable<any> {
    return this.http.post(`${this.apiUrl}/empresa/usuario`, user, { observe: 'response' })
    .pipe(
      tap(response => {
        console.log('Response completo:', response);
      }),

      catchError(error => {
        console.error('Erro ao criar usuario:', error);
        return throwError(error);
      })
    );
  }

  buscarPerfilUsuario(): Observable<PerfilUsuario>{
    return this.http.get<PerfilUsuarioResponse>(`${this.apiUrl}/usuario/perfil`, { observe: 'response' })
    .pipe(
      tap(response => {
        console.log('Response completo:', response);
      }),
      map(response => {
        if (response.body && response.body.data) {
          const usuarios = response.body.data;
          console.log('perfil mapeado:', usuarios);
          return usuarios;
        } else {
          console.error('Formato de resposta inesperado:', response);
          throw new Error('Formato de resposta inesperado ou perfil não encontrado');
        }
      }),
      catchError(error => {
        console.error('Erro ao buscar perfil usuario:', error);
        return throwError(error);
      })
    );
  }

  alterarPerfilUsuario(perfil: PerfilUsuario): Observable<any>{
    const p ={
      foto: perfil.foto
    }
    return this.http.put(`${this.apiUrl}/usuario/perfil`, p, { observe: 'response' })
    .pipe(
      tap(response => {
        console.log('Response completo:', response);
      }),

      catchError(error => {
        console.error('Erro ao alterar perfil usuario:', error);
        return throwError(error);
      })
    );
  }

  alterarConfigUsuario(perfil: PerfilUsuario): Observable<any>{
    const c ={
      openai_token: perfil.configuracoes.openai_token,
      gemini_token: perfil.configuracoes.gemini_token
    }
    return this.http.put(`${this.apiUrl}/usuario/configuracao`, c, { observe: 'response' })
    .pipe(
      tap(response => {
        console.log('Response completo:', response);
      }),

      catchError(error => {
        console.error('Erro ao alterar configuração usuario:', error);
        return throwError(error);
      })
    );
  }
}
