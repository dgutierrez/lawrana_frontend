import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../core/services/usuario.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { EmpresaService } from '../../core/services/empresa.service';
import { Observable, combineLatest, map } from 'rxjs';


@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterModule, NgIf, AsyncPipe],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css'
})
export class CabecalhoComponent implements OnInit {
  constructor(private router: Router,
    private userService : UsuarioService,
    private empService : EmpresaService){

  }

  user$ = this.userService.retornarUser();
  emp$ = this.empService.retornarUser();
  isUserOrEmpresaPresent$!: Observable<boolean>;

  ngOnInit(): void {

    this.isUserOrEmpresaPresent$ = combineLatest([this.user$, this.emp$]).pipe(
      map(([user, emp]) => !!user || !!emp)
    );
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

  logout(){
    if(this.userService.estaLogado())
      this.userService.logout();

    if(this.empService.estaLogado())
      this.empService.logout();

    this.router.navigate(['/']);
  }
}
