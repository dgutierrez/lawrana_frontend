import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../interfaces/usuario';
import { UsuarioService } from '../../../core/services/usuario.service';
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ModalExclusaoComponent } from '../../../shared/modal-exclusao/modal-exclusao.component';

@Component({
  selector: 'app-empresa-usuarios',
  standalone: true,
  imports: [NgFor, NgIf, MatIconModule, MatButtonModule],
  templateUrl: './empresa-usuarios.component.html',
  styleUrl: './empresa-usuarios.component.css'
})
export class EmpresaUsuariosComponent implements OnInit {
  usuarios: Usuario[] = []

  constructor(private userService: UsuarioService,
    private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.userService.listarUsuarios().subscribe((response: Usuario[]) => {
      this.usuarios = response;
    })
  }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ModalExclusaoComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Código para excluir o item
        console.log('Usuário confirmou a exclusão');
        /*this.assistenteService.deletarAssistente(this.assistente!.codigo_assistente!).subscribe((response) =>
        {
          this.deletouAssistente.emit();
        });*/
      } else {
        console.log('Usuário cancelou a exclusão');
      }
    });
  }
}
