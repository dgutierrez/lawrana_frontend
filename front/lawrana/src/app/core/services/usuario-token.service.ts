import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class UsuarioTokenService {

  constructor() { }

  salvarToken(token: string, key: string) {
    return localStorage.setItem(key, token);
  }

  salvarTokenCSRF(token: string, key: string) {
    return localStorage.setItem(key, token);
  }

  excluirToken(key: string) {
    localStorage.removeItem(key);
  }

  buscarToken(key: string) {
    if (typeof localStorage !== 'undefined') {
      console.log(`buscando token: ${localStorage.getItem(key)}`);
      return localStorage.getItem(key) ?? "";
    }
    return "";
  }

  possuiToken(key: string) {
    return !!this.buscarToken(key);
  }
}
