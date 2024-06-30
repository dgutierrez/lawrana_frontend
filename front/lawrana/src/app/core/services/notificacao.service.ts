import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificacaoComponent } from '../../shared/notificacao/notificacao.component';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

  constructor(private snackBar: MatSnackBar) {

  }

  exibirNotificacao(msg: string, btn: string, tipo: 'error' | 'success') {
    this.snackBar.openFromComponent(NotificacaoComponent, {
      data: {
        message: msg,
        buttonText: btn,
        type: tipo
      },
      duration: 30000, // Duração do toast em milissegundos
      panelClass: 'custom-snackbar',
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
