import { Component, Inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DiretorioService } from '../../../../core/services/diretorio.service';
import { NotificacaoService } from '../../../../core/services/notificacao.service';

@Component({
  selector: 'app-user-folder-modal-upload',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './user-folder-modal-upload.component.html',
  styleUrl: './user-folder-modal-upload.component.css'
})
export class UserFolderModalUploadComponent {
  @Input() codigo_diretorio: string = ''
  nome_diretorio: string = ''
  constructor(public dialogRef: MatDialogRef<UserFolderModalUploadComponent>,
    public diretorioService: DiretorioService,
    private notificador: NotificacaoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.codigo_diretorio = data.codigo_diretorio;
  }

  onConfirm(): void {
    this.diretorioService.criarDiretorio(this.codigo_diretorio, this.nome_diretorio).subscribe({
      next: (value) => {
        console.log('diretorio criado', value);
        this.notificador.exibirNotificacao('Diretorio criado com sucesso', 'Fechar', 'success');
        //this.router.navigate(['/usuario/assistentes']);

        this.dialogRef.close(true);
      },
      error: (err) => {
        console.log('exception...', err);
        var msgErros = err.error.erros;
        this.notificador.exibirNotificacao(msgErros[0], 'Fechar', 'error');
      }
    });

  }

  onCancel(): void {
    console.log(this.codigo_diretorio);
    this.nome_diretorio = ''
    this.dialogRef.close(false);
  }
}
