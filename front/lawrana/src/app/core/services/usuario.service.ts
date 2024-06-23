import { Injectable } from '@angular/core';
import { UsuarioTokenService } from './usuario-token.service';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { UsuarioToken } from '../../interfaces/usuarioToken';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../interfaces/usuario';
import { environment } from '../../environments/environment';

const KEY = 'lawrana-user-token'

interface ListaEmpresaResponse {
  data: Usuario[];
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

  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<ListaEmpresaResponse>(`${this.apiUrl}/empresa/usuario`, { observe: 'response' })
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
}
