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
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-criar-user-assistente',
  standalone: true,
  imports: [MatFormFieldModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterModule, MatSelectModule, NgIf],
  templateUrl: './criar-user-assistente.component.html',
  styleUrl: './criar-user-assistente.component.css'
})
export class CriarUserAssistenteComponent {
  assistente: Assistente = {
    contexto: 'contexto mock',
    descricao: 'novo assistente',
    editavel: true,
    escopo: 'Privado',
    nome: 'novo assistente',
    nome_modelo: 'Gemini',
    codigo_assistente: 'abc-123',
    foto: ''
  }

  constructor(private assistenteService: AssistenteService,
    private router: Router
  ){

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
