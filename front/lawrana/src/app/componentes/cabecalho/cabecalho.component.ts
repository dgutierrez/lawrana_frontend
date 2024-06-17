import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../core/services/usuario.service';
import { AsyncPipe, NgIf } from '@angular/common';


@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterModule, NgIf, AsyncPipe],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css'
})
export class CabecalhoComponent {
  constructor(private router: Router,
    private userService : UsuarioService
  ){

  }

  user$ = this.userService.retornarUser();

  sobre(){
    this.router.navigate(['/']);
  }

  empresaLogin(){
    this.router.navigate(['/empresa/login']);
  }

  usuarioLogin(){
    this.router.navigate(['/usuario/login']);
  }

  logout(){
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
