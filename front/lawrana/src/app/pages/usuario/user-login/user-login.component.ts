import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { UsuarioAutenticacaoService } from '../../../core/services/usuario-autenticacao.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent implements OnInit {
  constructor(private router: Router,
          private formBuilder: FormBuilder,
          private authService: UsuarioAutenticacaoService){

  }

  errosApi: string[] = []

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      codigo_empresa: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, Validators.required]
    })
  }

  loginForm!: FormGroup;

  usuarioLogin(){
    this.router.navigate(['/usuario']);
  }

  login(){
    const codigo_empresa = this.loginForm.value.codigo_empresa;
    const email = this.loginForm.value.email;
    const senha = this.loginForm.value.senha;

    this.authService.autenticar(codigo_empresa, email, senha).subscribe({
      next: (value) => {
        this.router.navigate(['/usuario']);
      },
      error: (err) => {
        this.errosApi = err?.error?.erros || [];
      }
    });

  }
}
