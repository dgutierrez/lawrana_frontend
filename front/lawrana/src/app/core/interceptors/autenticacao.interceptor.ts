import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';

export const autenticacaoInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('interceptando2')

  const novaReq = req.clone({
    setHeaders: {
      'X-teste': 'teste de cab'
    }
  });

  //return next(novaReq);
  const router = inject(Router);

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


