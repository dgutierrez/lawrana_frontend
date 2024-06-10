import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css'
})
export class CabecalhoComponent {
  constructor(private router: Router){

  }

  sobre(){
    this.router.navigate(['/']);
  }

  empresaLogin(){
    this.router.navigate(['/empresa/login']);
  }

  usuarioLogin(){
    this.router.navigate(['/usuario/login']);
  }
}
