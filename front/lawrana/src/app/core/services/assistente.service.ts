import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Assistente } from '../../interfaces/assistente';
import { Observable } from 'rxjs';
import { UsuarioService } from './usuario.service';
import { UsuarioTokenService } from './usuario-token.service';

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
}
