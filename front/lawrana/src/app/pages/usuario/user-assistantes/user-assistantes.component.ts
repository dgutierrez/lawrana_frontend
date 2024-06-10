import { Component, Input } from '@angular/core';
import { Assistente } from '../../../interfaces/assistente';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-assistantes',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './user-assistantes.component.html',
  styleUrl: './user-assistantes.component.scss'
})
export class UserAssistantesComponent {
  @Input() assistente: Assistente = {
    contexto: '',
    editavel: false,
    escopo: 'Publico',
    nome: 'teste',
    codigo_assistente: ''
  }
}
