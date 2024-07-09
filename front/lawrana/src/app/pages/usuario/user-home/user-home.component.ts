import { MenuItem } from './../../../shared/meu-sidenav/meu-sidenav.component';
import { Component, signal, OnInit } from '@angular/core';
import { NavigatorComponent } from '../../../shared/navigator/navigator.component';
import { ViewerComponent } from '../../../shared/viewer/viewer.component';
import { UsuarioTokenService } from '../../../core/services/usuario-token.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../core/services/usuario.service';
import { PerfilUsuario } from '../../../interfaces/usuario';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [NavigatorComponent, ViewerComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit {
  usuarioMenuItems = signal<MenuItem[]>([
    {
      icon: 'people',
      label: 'Assistentes',
      route: 'assistentes'
    },
    {
      icon: 'chat',
      label: 'Chats',
      route: 'chats'
    },
    {
      icon: 'cloud_upload',
      label: 'Uploads',
      route: 'uploads'
    },
    {
      icon: 'person',
      label: 'Perfil',
      route: 'perfil'
    }
  ])

  perfil!: PerfilUsuario;
  nomeUsuario: string = '';

  constructor(
      private userService: UsuarioService,
      private router: Router
  ){

  }

  ngOnInit():void {
    this.userService.buscarPerfilUsuario().subscribe((resp) => {
      this.perfil = resp;
    })
  }
}
