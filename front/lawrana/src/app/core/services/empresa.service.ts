import { Injectable } from '@angular/core';
import { UsuarioTokenService } from './usuario-token.service';
import { Empresa } from '../../interfaces/empresa';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { EmpresaToken } from '../../interfaces/empresaToken';
import { EmpresaConfig } from '../../interfaces/empresaConfig';

const KEY = 'lawrana-emp-token'

interface BuscaEmpresaResponse {
  data: Empresa;
}

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private userSubject = new BehaviorSubject<EmpresaToken | null>(null);
  private apiUrl = environment.apiUrl;

  constructor(private usuarioTokenService : UsuarioTokenService,
    private http: HttpClient) {
    if(this.usuarioTokenService.possuiToken(KEY)){
      this.decodificarJwt();
    }
  }

  decodificarJwt() {
    const token = this.usuarioTokenService.buscarToken(KEY);
    const user = jwtDecode(token) as EmpresaToken;

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

  buscarEmpresa(): Observable<Empresa> {
    let idEmp: string | undefined;
    this.retornarUser().subscribe((r) => {
      idEmp = r?.user
    })

    console.log('Recuperando idEmp do token: ');
    console.log(idEmp);

    return this.http.get<BuscaEmpresaResponse>(`${this.apiUrl}/empresa/${idEmp}`, { observe: 'response' })
    .pipe(
      tap(response => {
        console.log('Response completo:', response);
      }),
      map(response => {
        if (response.body && response.body.data) {
          const empresa = response.body.data;
          console.log('Empresa mapeado:', empresa);
          return empresa;
        } else {
          console.error('Formato de resposta inesperado:', response);
          throw new Error('Formato de resposta inesperado ou empresa não encontrado');
        }
      }),
      catchError(error => {
        console.error('Erro ao buscar empresa:', error);
        return throwError(error);
      })
    );
  }

  altearEmpresa(emp: Empresa): Observable<any> {
    let idEmp: string | undefined;
    this.retornarUser().subscribe((r) => {
      idEmp = r?.user
    })

    return this.http.put(`${this.apiUrl}/empresa`, emp);
  }

  altearConfigEmpresa(empConfig: EmpresaConfig): Observable<any> {
    return this.http.put(`${this.apiUrl}/empresa/configuracao`, empConfig);
  }
}
