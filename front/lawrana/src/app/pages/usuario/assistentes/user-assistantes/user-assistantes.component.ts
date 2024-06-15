import { Component, Input } from '@angular/core';
import { Assistente } from '../../../../interfaces/assistente';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    codigo_escopo: 'Publico',
    nome: 'teste',
    codigo_assistente: '',
    foto: ''
  }

  constructor(private router: Router){

  }

  editarAssistente(a: Assistente){
    console.log(a.nome);
    this.router.navigate(['assistentes/editar'])
  }
}
