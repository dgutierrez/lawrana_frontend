import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpresaAutenticacaoService } from '../../../core/services/empresa-autenticacao.service';
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-emp-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './emp-login.component.html',
  styleUrl: './emp-login.component.css'
})
export class EmpLoginComponent implements OnInit {

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private authService: EmpresaAutenticacaoService){

  }

  errosApi: string[] = []

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, Validators.required]
    })
  }

  loginForm!: FormGroup;
  empresaLogin(){
    this.router.navigate(['/empresa']);
  }

  login(){
    const email = this.loginForm.value.email;
    const senha = this.loginForm.value.senha;

    this.authService.autenticar(email, senha).subscribe({
      next: (value) => {
        console.log('login', value);

        this.router.navigate(['/empresa']);
      },
      error: (err) => {
        console.log('exception...', err);
        console.log('exception...', err?.error?.erros);
        this.errosApi = err?.error?.erros || [];

        console.log(this.errosApi?.length)
      }
    });
  }
}
