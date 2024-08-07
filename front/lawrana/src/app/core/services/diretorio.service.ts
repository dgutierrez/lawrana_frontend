import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Diretorio } from '../../interfaces/diretorio';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

interface DiretorioResponse {
  data: Diretorio
}

interface ListaDiretorioResponse {
  data: Diretorio[]
}

@Injectable({
  providedIn: 'root'
})
export class DiretorioService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {

  }

  listarDiretorio(): Observable<Diretorio>{
    return this.http.get<DiretorioResponse>(`${this.apiUrl}/diretorio`, { observe: 'response' })
    .pipe(
      tap(response => {
        //console.log('Response completo:', response);
      }),
      map(response => {
        if (response.body && response.body.data) {
          const diretorio = response.body.data;
          //console.log('chat mapeado:', chat);
          return diretorio;
        }else {
          //console.error('Formato de resposta inesperado:', response);
          throw new Error('Formato de resposta inesperado ou diretorio não encontrado');
        }
      })
    );
  }

  buscarDiretorio(idDiretorio: string): Observable<Diretorio>{
    return this.http.get<DiretorioResponse>(`${this.apiUrl}/diretorio/${idDiretorio}`, { observe: 'response' })
    .pipe(
      tap(response => {
        //console.log('Response completo:', response);
      }),
      map(response => {
        if (response.body && response.body.data) {
          const diretorio = response.body.data;
          //console.log('chat mapeado:', chat);
          return diretorio;
        }else {
          //console.error('Formato de resposta inesperado:', response);
          throw new Error('Formato de resposta inesperado ou diretorio não encontrado');
        }
      })
    );
  }

  criarDiretorio(idDiretorio: string, nomeDiretorio: string): Observable<any>{
    const novoDiretorio = {
      nome_pasta: nomeDiretorio,
      codigo_pasta_pai: idDiretorio
    }

    return this.http.post(`${this.apiUrl}/diretorio`, novoDiretorio);
  }

  enviarDocumento(idDiretorio: string, file: File): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('files', file, file.name);

    return this.http.post(`${this.apiUrl}/diretorio/${idDiretorio}/documento`, formData);
  }
}
