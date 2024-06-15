import { Injectable } from '@angular/core';

const KEY = 'lawrana-user-token'

@Injectable({
  providedIn: 'root'
})
export class UsuarioTokenService {

  constructor() { }

  salvarToken(token: string) {
    return localStorage.setItem(KEY, token);
  }

  excluirToken() {
    localStorage.removeItem(KEY);
  }

  buscarToken() {
    if (typeof localStorage !== 'undefined') {
      console.log(`buscando token: ${localStorage.getItem(KEY)}`);
      return localStorage.getItem(KEY) ?? "";
    }
    return "";
  }

  possuiToken() {
    return !!this.buscarToken();
  }
}
