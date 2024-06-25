import { ConfigUsuario } from './../../interfaces/usuario';
import { NgFor, NgIf } from '@angular/common';
import { Component, signal, Input, computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'
import { Router, RouterModule } from '@angular/router';
import { PerfilUsuario } from '../../interfaces/usuario';

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-meu-sidenav',
  standalone: true,
  imports: [MatListModule, MatIconModule, NgFor, NgIf, RouterModule],
  templateUrl: './meu-sidenav.component.html',
  styleUrl: './meu-sidenav.component.css'
})
export class MeuSidenavComponent {
  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean){
    this.sideNavCollapsed.set(val)
  }

  @Input() perfilUsuario: PerfilUsuario = {
    codigo_usuario: '',
    codigo_usuario_integracao: '',
    configuracoes:  {
      openai_token: '',
      gemini_token: ''
    },
    data_cadastro: '',
    email: '',
    foto: null,
    nome: 'teste'
  }
  @Input() menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'dasboard'
    },
    {
      icon: 'people',
      label: 'Assistentes',
      route: 'assistentes'
    },
  ])

  profilePicSize = computed(() => this.sideNavCollapsed() ? '32' : '100');
}
