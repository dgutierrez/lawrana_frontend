import { Component, Input } from '@angular/core';
import { Assistente } from '../../../../interfaces/assistente';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select'
//import { BrowserModule }  from '@angular/platform-browser';
//import { MatFileUploadModule } from 'angular-material-fileupload';

@Component({
  selector: 'app-editar-user-assistente',
  standalone: true,
  imports: [MatFormFieldModule, MatIconModule, FormsModule, MatInputModule, MatButtonModule, RouterModule, MatSelectModule],
  templateUrl: './editar-user-assistente.component.html',
  styleUrl: './editar-user-assistente.component.css'
})
export class EditarUserAssistenteComponent {
  @Input() assistente: Assistente = {
    contexto: 'contexto mock',
    descricao: 'descricao',
    editavel: true,
    escopo: 'Privado',
    nome: 'Assistente mock 1',
    codigo_assistente: 'abc-123',
    foto: 'foto'
  }
}
