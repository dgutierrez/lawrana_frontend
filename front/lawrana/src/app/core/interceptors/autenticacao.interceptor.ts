import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandlerFn, HttpHeaders, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { EmpresaService } from '../services/empresa.service';
import { UsuarioService } from '../services/usuario.service';

export const autenticacaoInterceptor: HttpInterceptorFn = (req, next) => {
  //console.log('interceptando3')

  const userService = inject(UsuarioService);
  const empresaService = inject(EmpresaService);
  const router = inject(Router);
  let token: string = ''

  if (req.url.includes('login')) {

  } else {
    if (req.url.includes('empresa')) {
      //console.log('A URL contém a palavra "empresa".');
      // Faça algo quando a URL contém "empresa"
      token = empresaService.buscarToken();
    } else {
      //console.log('A URL não contém a palavra "empresa".');
      token = userService.buscarToken()
    }
  }

  let novaReq: HttpRequest<unknown>;

  if(token !== ''){
      novaReq = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  } else {
    novaReq = req.clone()
  }

  return next(novaReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Redirecionar para a página de login
        router.navigate(['usuario/login']);
        console.error('Token inválido ou expirado. Redirecionando para a página de login.');
      }
      return throwError(error);
    }))
};


