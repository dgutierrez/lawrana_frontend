import { Component } from '@angular/core';
import { Assistente } from '../../../../interfaces/assistente';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';
import { UserAssistantesComponent } from '../../user-assistantes/user-assistantes.component';

@Component({
  selector: 'app-listar-user-assistente',
  standalone: true,
  imports: [MatCardModule, NgFor, NgIf, UserAssistantesComponent],
  templateUrl: './listar-user-assistente.component.html',
  styleUrl: './listar-user-assistente.component.scss'
})
export class ListarUserAssistenteComponent {
  assistentes: Assistente[] = [
    {
      contexto: 'contexto mock',
      editavel: true,
      escopo: 'Privado',
      nome: 'Assistente mock 1',
      codigo_assistente: 'abc-123'
    },
    {
      contexto: 'contexto mock 2',
      editavel: false,
      escopo: 'Publico',
      nome: 'Assistente mock 2',
      codigo_assistente: 'def-456'
    },
    {
      contexto: 'contexto mock 2',
      editavel: false,
      escopo: 'Publico',
      nome: 'Assistente mock 2',
      codigo_assistente: 'def-456'
    },
    {
      contexto: 'contexto mock 2',
      editavel: false,
      escopo: 'Publico',
      nome: 'Assistente mock 2',
      codigo_assistente: 'def-456'
    },
    {
      contexto: 'contexto mock 2',
      editavel: false,
      escopo: 'Publico',
      nome: 'Assistente mock 2',
      codigo_assistente: 'def-456'
    },
    {
      contexto: 'contexto mock 2',
      editavel: false,
      escopo: 'Publico',
      nome: 'Assistente mock 2',
      codigo_assistente: 'def-456'
    },
    {
      contexto: 'contexto mock 2',
      editavel: false,
      escopo: 'Publico',
      nome: 'Assistente mock 2',
      codigo_assistente: 'def-456'
    },
    {
      contexto: 'contexto mock 2',
      editavel: false,
      escopo: 'Publico',
      nome: 'Assistente mock 2',
      codigo_assistente: 'def-456'
    },
    {
      contexto: 'contexto mock 2',
      editavel: false,
      escopo: 'Publico',
      nome: 'Assistente mock 2',
      codigo_assistente: 'def-456'
    },
    {
      contexto: 'contexto mock 2',
      editavel: false,
      escopo: 'Publico',
      nome: 'Assistente mock 2',
      codigo_assistente: 'def-456'
    }
  ]
}
