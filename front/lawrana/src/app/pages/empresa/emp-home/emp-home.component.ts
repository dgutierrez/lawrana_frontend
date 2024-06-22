import { Component, signal } from '@angular/core';
import { NavigatorComponent } from '../../../shared/navigator/navigator.component';
import { ViewerComponent } from '../../../shared/viewer/viewer.component';
import { MenuItem } from '../../../shared/meu-sidenav/meu-sidenav.component';

@Component({
  selector: 'app-emp-home',
  standalone: true,
  imports: [NavigatorComponent, ViewerComponent],
  templateUrl: './emp-home.component.html',
  styleUrl: './emp-home.component.css'
})
export class EmpHomeComponent {
  usuarioMenuItems = signal<MenuItem[]>([
    {
      icon: 'source_environment',
      label: 'Perfil',
      route: 'perfil'
    },
    {
      icon: 'toggle_on',
      label: 'Configurações',
      route: 'configuracoes'
    },
    {
      icon: 'supervisor_account',
      label: 'Usuarios',
      route: 'usuarios'
    },
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'dash'
    }
  ])
}
