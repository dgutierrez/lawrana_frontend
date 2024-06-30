import { AssistenteService } from './../../../../core/services/assistente.service';
import { Component, Input, OnInit } from '@angular/core';
import { Assistente } from '../../../../interfaces/assistente';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select'
import { NgIf } from '@angular/common';
import { NotificacaoService } from '../../../../core/services/notificacao.service';
//import { BrowserModule }  from '@angular/platform-browser';
//import { MatFileUploadModule } from 'angular-material-fileupload';

@Component({
  selector: 'app-editar-user-assistente',
  standalone: true,
  imports: [MatFormFieldModule, MatIconModule, FormsModule, MatInputModule, MatButtonModule, RouterModule, MatSelectModule, NgIf],
  templateUrl: './editar-user-assistente.component.html',
  styleUrl: './editar-user-assistente.component.css'
})
export class EditarUserAssistenteComponent implements OnInit {
  @Input() assistente: Assistente = {
    contexto: '',
    descricao: '',
    editavel: true,
    escopo: '',
    nome: '',
    nome_modelo: '',
    codigo_assistente: '',
    foto: ''
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private assistenteService : AssistenteService,
    private notificador: NotificacaoService){

  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.assistente.foto = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')

    console.log('buscando id: ' + id)

    this.assistenteService.buscarAssistente(id!).subscribe((response) => {
      this.assistente = response;

      console.log(this.assistente);
    })
  }

  alterarAssistente(){
    this.assistenteService.alterarAssistente(this.assistente).subscribe({
      next: (value) => {
        console.log('assistente alterado', value);
        this.notificador.exibirNotificacao('Assistente alterado com sucesso', 'Fechar', 'success');
        this.router.navigate(['/usuario/assistentes']);
      },
      error: (err) => {
        console.log('exception...', err);
        var msgErros = err.error.erros;
        this.notificador.exibirNotificacao(msgErros[0], 'Fechar', 'error');
      }
    });
  }
}
