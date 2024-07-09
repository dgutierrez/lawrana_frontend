import { Component, Inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DiretorioService } from '../../../../core/services/diretorio.service';
import { NotificacaoService } from '../../../../core/services/notificacao.service';

@Component({
  selector: 'app-user-document-modal-upload',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './user-document-modal-upload.component.html',
  styleUrl: './user-document-modal-upload.component.css'
})
export class UserDocumentModalUploadComponent {
  @Input() codigo_diretorio: string = ''
  selectedFile: File | null = null;

  constructor(public dialogRef: MatDialogRef<UserDocumentModalUploadComponent>,
    public diretorioService: DiretorioService,
    private notificador: NotificacaoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.codigo_diretorio = data.codigo_diretorio;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onConfirm(): void {
    if(this.selectedFile == null)
    {
      return;
    }

    this.diretorioService.enviarDocumento(this.codigo_diretorio, this.selectedFile!).subscribe({
      next: (value) => {
        console.log('documento criado', value);
        this.notificador.exibirNotificacao('Documento criado com sucesso', 'Fechar', 'success');
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
    this.dialogRef.close(false);
  }
}
