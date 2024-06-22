import { Injectable } from '@angular/core';
import { UsuarioTokenService } from './usuario-token.service';
import { Empresa } from '../../interfaces/empresa';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

const KEY = 'lawrana-emp-token'

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private userSubject = new BehaviorSubject<Empresa | null>(null);

  constructor(private usuarioTokenService : UsuarioTokenService) {
    if(this.usuarioTokenService.possuiToken(KEY)){
      this.decodificarJwt();
    }
  }

  decodificarJwt() {
    const token = this.usuarioTokenService.buscarToken(KEY);
    const user = jwtDecode(token) as Empresa;

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
}
