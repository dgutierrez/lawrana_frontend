import { Component } from '@angular/core';
import { Assistente } from '../../../../interfaces/assistente';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';
import { UserAssistantesComponent } from '../../user-assistantes/user-assistantes.component';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listar-user-assistente',
  standalone: true,
  imports: [MatCardModule, NgFor, NgIf, UserAssistantesComponent, MatButtonModule, MatIconModule],
  templateUrl: './listar-user-assistente.component.html',
  styleUrl: './listar-user-assistente.component.scss'
})
export class ListarUserAssistenteComponent {
  assistentes: Assistente[] = [
    {
      contexto: 'contexto mock',
      descricao: 'descricao',
      editavel: true,
      escopo: 'Privado',
      nome: 'Assistente mock 1',
      codigo_assistente: 'abc-123',
      foto: ''
    },
    {
      contexto: 'contexto mock 2',
      descricao: 'descricao',
      editavel: false,
      escopo: 'Privado',
      nome: 'Assistente mock 2',
      codigo_assistente: 'def-456',
      foto: ''
    },
    {
      contexto: 'contexto mock 3',
      descricao: 'descricao',
      editavel: false,
      escopo: 'Publico',
      nome: 'Assistente mock 3',
      codigo_assistente: 'def-123',
      foto: ''
    },
    {
      contexto: 'contexto mock 4',
      descricao: 'descricao',
      editavel: false,
      escopo: 'Publico',
      nome: 'Assistente mock 4',
      codigo_assistente: 'def-789',
      foto: ''
    },
    {
      contexto: 'contexto mock 5',
      descricao: 'descricao',
      editavel: false,
      escopo: 'Publico',
      nome: 'Assistente mock 5',
      codigo_assistente: 'def-999',
      foto: ''
    },
    {
      contexto: 'contexto mock 6',
      descricao: 'descricao',
      editavel: false,
      escopo: 'Publico',
      nome: 'Assistente mock 6',
      codigo_assistente: 'aaa-111',
      foto: ''
    }
  ]

  constructor(private router: Router){

  }


}
