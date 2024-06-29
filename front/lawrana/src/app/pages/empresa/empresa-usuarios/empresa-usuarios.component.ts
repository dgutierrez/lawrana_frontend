import { Component, OnInit } from '@angular/core';
import { Usuario, UsuarioPaginador } from '../../../interfaces/usuario';
import { UsuarioService } from '../../../core/services/usuario.service';
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ModalExclusaoComponent } from '../../../shared/modal-exclusao/modal-exclusao.component';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ModalResetSenhaComponent } from '../modal-reset-senha/modal-reset-senha.component';
import { EmpresaService } from '../../../core/services/empresa.service';
import { ListaPessoaAnimationTrigger } from '../../../animations/lista-pessoa-animation';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-empresa-usuarios',
  standalone: true,
  imports: [NgFor, NgIf, MatIconModule, MatButtonModule, RouterModule, MatPaginatorModule, MatInputModule, FormsModule],
  templateUrl: './empresa-usuarios.component.html',
  styleUrl: './empresa-usuarios.component.css',
  animations: [ListaPessoaAnimationTrigger]
})
export class EmpresaUsuariosComponent implements OnInit {
  usuariosPaginado: UsuarioPaginador = {
    qtd_paginas: 0,
    qtd_usuarios: 0,
    usuarios: []
  }
  pageEvent!: PageEvent;
  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 25];
  indexPessoa = -1;
  nomeBusca: string = ''

  constructor(private userService: UsuarioService,
    private empService: EmpresaService,
    private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.carregarLista(this.pageIndex, this.pageSize, this.nomeBusca);
  }

  carregarLista(pagina: number, registros: number, filtro: string) {
    this.userService.listarUsuarios(pagina, registros, filtro).subscribe((response: UsuarioPaginador) => {
      this.usuariosPaginado = response;
    })
  }

  openConfirmDialog(id: string): void {
    const dialogRef = this.dialog.open(ModalExclusaoComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Código para excluir o item
        console.log('Usuário confirmou a exclusão');
        this.userService.deletarUsuario(id).subscribe((response) =>
        {
          this.carregarLista(this.pageIndex, this.pageSize, this.nomeBusca);
        });
      } else {
        console.log('Usuário cancelou a exclusão');
      }
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    console.log(e.pageSize)
    this.carregarLista(e.pageIndex, e.pageSize, this.nomeBusca);
  }

  resetarSenha(id: string){
    const dialogRef = this.dialog.open(ModalResetSenhaComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Código para excluir o item
        this.empService.resetarSenhaUsuario(id).subscribe((response) =>
        {
          this.carregarLista(this.pageIndex, this.pageSize, this.nomeBusca);
        });
      } else {
        console.log('Usuário cancelou o reset');
      }
    });
  }

  filtrarPorNome(nomeBusca: string) {
    if(this.nomeBusca.length > 2 || this.nomeBusca.length == 0)
    {
      this.carregarLista(this.pageIndex, this.pageSize, this.nomeBusca);
    }
  }
}
