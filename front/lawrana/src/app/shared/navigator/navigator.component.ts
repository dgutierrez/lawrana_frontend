import { Component, Input, signal, computed } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { MenuItem, MeuSidenavComponent } from '../meu-sidenav/meu-sidenav.component';
import { PerfilUsuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-navigator',
  standalone: true,
  imports: [MatToolbarModule, MatIcon, MatButton, MatSidenavModule, RouterOutlet, MeuSidenavComponent],
  templateUrl: './navigator.component.html',
  styleUrl: './navigator.component.css',
})
export class NavigatorComponent {
  @Input() tipo:string = ''
  @Input() perfilUsuario!: PerfilUsuario;

  collapsed = signal(false)

  sideNavWidth = computed(() =>
    this.collapsed() ? '65px' : '250px'
  );

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
}
