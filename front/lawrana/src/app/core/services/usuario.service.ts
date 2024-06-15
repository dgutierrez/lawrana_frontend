import { Injectable } from '@angular/core';
import { UsuarioTokenService } from './usuario-token.service';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Usuario } from '../../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private userSubject = new BehaviorSubject<Usuario | null>(null);

  constructor(private usuarioTokenService : UsuarioTokenService) {
    if(this.usuarioTokenService.possuiToken()){
      this.decodificarJwt();
    }
  }

  decodificarJwt() {
    const token = this.usuarioTokenService.buscarToken();
    const user = jwtDecode(token) as Usuario;

    this.userSubject.next(user);
  }

  retornarUser() {
    return this.userSubject.asObservable();
  }

  salvarToken(token: string) {
    this.usuarioTokenService.salvarToken(token);
    this.decodificarJwt();
  }

  logout() {
    this.usuarioTokenService.excluirToken();
    this.userSubject.next(null);
  }

  estaLogado() {
    return this.usuarioTokenService.possuiToken();
  }
}
