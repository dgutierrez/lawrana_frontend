import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Assistente } from '../../../../interfaces/assistente';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ModalExclusaoComponent } from '../../../../shared/modal-exclusao/modal-exclusao.component';
import { AssistenteService } from '../../../../core/services/assistente.service';

@Component({
  selector: 'app-user-assistantes',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule, MatFormFieldModule, MatInputModule, MatIconModule, MatTooltipModule],
  templateUrl: './user-assistantes.component.html',
  styleUrl: './user-assistantes.component.scss'
})
export class UserAssistantesComponent {
  @Input() assistente: Assistente = {
    contexto: '',
    descricao: 'descricao',
    editavel: false,
    escopo: 'Privado',
    nome: 'teste',
    codigo_assistente: '',
    foto: ''
  }

  @Output() deletouAssistente = new EventEmitter();

  constructor(private assistenteService: AssistenteService,
    private router: Router,
    private dialog: MatDialog){

  }

  editarAssistente(a: Assistente){
    console.log(a.nome);
    this.router.navigate(['assistentes/editar'])
  }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ModalExclusaoComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Código para excluir o item
        console.log('Usuário confirmou a exclusão');
        this.assistenteService.deletarAssistente(this.assistente!.codigo_assistente!).subscribe((response) =>
        {
          this.deletouAssistente.emit();
        });
      } else {
        console.log('Usuário cancelou a exclusão');
      }
    });
  }
}
