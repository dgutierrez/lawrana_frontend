import { Component, OnInit } from '@angular/core';
import { Assistente } from '../../../../interfaces/assistente';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';
import { UserAssistantesComponent } from '../user-assistantes/user-assistantes.component';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AssistenteService } from '../../../../core/services/assistente.service';

@Component({
  selector: 'app-listar-user-assistente',
  standalone: true,
  imports: [MatCardModule, NgFor, NgIf, UserAssistantesComponent, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './listar-user-assistente.component.html',
  styleUrl: './listar-user-assistente.component.scss'
})
export class ListarUserAssistenteComponent implements OnInit {
  assistentes: Assistente[] = [ ]

  constructor(private assistenteService: AssistenteService,
    private router: Router){
      this.listarAssistentes();
  }

  ngOnInit(): void {

  }

  listarAssistentes() {
    this.assistenteService.listarAssistentes().subscribe((response: Assistente[]) => {
      console.log('Buscando assistentes:', response);

      this.assistentes = response;
      console.log('Assistentes atribuídos:', this.assistentes);
    });

    /*this.assistenteService.listarAssistentes().subscribe({
      next: (value) => {
        console.log('lista de assistentes ok')
        this.assistentes = value;

      },
      error: (err) => {
        console.log('exception...', err);
      }
    });*/
  }
}
