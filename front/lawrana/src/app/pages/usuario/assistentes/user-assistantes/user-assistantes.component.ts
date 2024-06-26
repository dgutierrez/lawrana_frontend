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
import { ChatService } from '../../../../core/services/chat.service';
import { NotificacaoService } from '../../../../core/services/notificacao.service';

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
    nome_modelo: 'OpenAi',
    codigo_assistente: '',
    foto: ''
  }

  @Output() deletouAssistente = new EventEmitter();

  constructor(private assistenteService: AssistenteService,
    private router: Router,
    private dialog: MatDialog,
    private chatService: ChatService,
    private notificador: NotificacaoService){

  }

  editarAssistente(a: Assistente){
    console.log(a.nome);
    this.router.navigate(['assistentes/editar'])
  }

  novoChar(){
    this.chatService.criarChat(this.assistente.codigo_assistente!).subscribe({
      next: (value) => {
        console.log('chat criado', value);
        this.router.navigate(['/usuario/chats']);
      },
      error: (err) => {
        console.log('exception...', err);
      }
    })
  }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ModalExclusaoComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Código para excluir o item
        console.log('Usuário confirmou a exclusão');
        this.assistenteService.deletarAssistente(this.assistente!.codigo_assistente!).subscribe({
          next: (value) => {
            this.notificador.exibirNotificacao('Assistente removido com sucesso', 'Fechar', 'success');
            this.deletouAssistente.emit();
          },
          error: (err) => {
            var msgErros = err.error.erros;
            this.notificador.exibirNotificacao(msgErros[0], 'Fechar', 'error');
          }
        });

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
