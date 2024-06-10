import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-login',
  standalone: true,
  imports: [],
  templateUrl: './emp-login.component.html',
  styleUrl: './emp-login.component.css'
})
export class EmpLoginComponent {

  constructor(private router: Router){

  }

  empresaLogin(){
    this.router.navigate(['/empresa']);
  }
}
