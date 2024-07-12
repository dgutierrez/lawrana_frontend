import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DiretorioService } from '../../../../../core/services/diretorio.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Diretorio } from '../../../../../interfaces/diretorio';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-chat-anexa-document-modal',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, MatIconModule, FormsModule, RouterModule, NgIf, NgFor, MatInputModule],
  templateUrl: './chat-anexa-document-modal.component.html',
  styleUrl: './chat-anexa-document-modal.component.css'
})
export class ChatAnexaDocumentModalComponent implements OnInit {
  codigo_documento: string = '';
  diretorioRaiz: Diretorio = {
    caminho_diretorio: '',
    codigo_diretorio: '',
    codigo_diretorio_pai: '',
    codigo_proprietario: '',
    documentos: [],
    nome_diretorio: '',
    sub_diretorios: []
  }

  diretorioId: string = ''

  constructor(public dialogRef: MatDialogRef<ChatAnexaDocumentModalComponent>,
    public diretorioService: DiretorioService,
    //private notificador: NotificacaoService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any){

  }

  onConfirm(): void {
    this.dialogRef.close(this.codigo_documento);

  }

  onCancel(): void {
    this.codigo_documento = '';
    this.dialogRef.close('');
  }

  ngOnInit(): void {
    this.carregarDiretorio();
  }

  carregarDiretorio()
  {
    this.route.params.subscribe(params => {
      this.diretorioId = params['id'];

      if(this.diretorioId != undefined)
      {
        console.log(`buscando diretorio ${this.diretorioId}`)
        this.buscarDiretorio(this.diretorioId);
      }
      else
      {
        console.log('listando diretorio raiz')
        this.listarDiretorios();
      }

    });
  }

  listarDiretorios()
  {
    this.diretorioService.listarDiretorio().subscribe((response: Diretorio) => {
      this.diretorioRaiz = response;
    });
  }

  buscarDiretorio(idDiretorio: string) {
    this.diretorioService.buscarDiretorio(idDiretorio).subscribe((response: Diretorio) => {
      this.diretorioRaiz = response;
    });
  }

  abrirDiretorio(id: string){
    console.log(id)
    this.buscarDiretorio(id);
  }

  selecionarDocumento(idDocumento: string){
    console.log(`doc: ${idDocumento}`);
    this.codigo_documento = idDocumento;
  }
}
