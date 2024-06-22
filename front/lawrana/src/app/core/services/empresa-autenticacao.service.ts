import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmpresaService } from './empresa.service';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

interface Data {
  token: string;
}

interface EmpresaAuthResponse {
  data: Data;
}

@Injectable({
  providedIn: 'root'
})
export class EmpresaAutenticacaoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    private empresaService: EmpresaService) {

  }

  autenticar(email: string, senha: string) : Observable<HttpResponse<EmpresaAuthResponse>>{
    return this.http.post<EmpresaAuthResponse>(`${this.apiUrl}/empresa/login`,
      {
        email,
        senha
      },
      {
        observe: 'response'
      }
    ).pipe(
      tap((response) => {
        const authToken = response.body?.data.token || ''
        this.empresaService.salvarToken(authToken);
      })
    )
  }


}
