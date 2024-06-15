import { AssistenteService } from './../../../../core/services/assistente.service';
import { Component, Input } from '@angular/core';
import { Assistente } from '../../../../interfaces/assistente';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select'

@Component({
  selector: 'app-criar-user-assistente',
  standalone: true,
  imports: [MatFormFieldModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterModule, MatSelectModule],
  templateUrl: './criar-user-assistente.component.html',
  styleUrl: './criar-user-assistente.component.css'
})
export class CriarUserAssistenteComponent {
  assistente: Assistente = {
    contexto: 'contexto mock',
    descricao: 'novo assistente',
    editavel: true,
    codigo_escopo: 'Privado',
    nome: 'novo assistente',
    codigo_assistente: 'abc-123',
    foto: 'foto'
  }

  constructor(private assistenteService: AssistenteService,
    private router: Router
  ){

  }

  criarAssistente(){
    this.assistenteService.criarAssistente(this.assistente).subscribe({
      next: (value) => {
        console.log('assistente criado', value);
        this.router.navigate(['/usuario/assistentes']);
      },
      error: (err) => {
        console.log('exception...', err);
      }
    });
  }
}
