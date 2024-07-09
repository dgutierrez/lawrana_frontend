import { Component, Input, OnInit } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DiretorioService } from '../../../core/services/diretorio.service';
import { Diretorio } from '../../../interfaces/diretorio';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { UserFolderUploadComponent } from './user-folder-upload/user-folder-upload.component';
import { UserDocumentUploadComponent } from './user-document-upload/user-document-upload.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { UserFolderModalUploadComponent } from './user-folder-modal-upload/user-folder-modal-upload.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-uploads',
  standalone: true,
  imports: [MatTreeModule, MatButtonModule, MatIconModule, MatProgressBarModule, NgIf, NgFor, UserFolderUploadComponent, UserDocumentUploadComponent, RouterModule, FormsModule, MatFormFieldModule, MatInputModule, MatMenuModule],
  templateUrl: './user-uploads.component.html',
  styleUrl: './user-uploads.component.css'
})
export class UserUploadsComponent implements OnInit {
  @Input() idDiretorioRaiz!: string;
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

  constructor(
    private diretorioService: DiretorioService,
    private route: ActivatedRoute,
    private dialog: MatDialog){
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

  openFolderModal() {
    const dialogRef = this.dialog.open(UserFolderModalUploadComponent, {
      width: '400px',
      data: {codigo_diretorio: this.diretorioRaiz.codigo_diretorio }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Nome da nova pasta:', result);
        if(result)
        {
          this.ngOnInit();
        }
      }
    });
  }
}
