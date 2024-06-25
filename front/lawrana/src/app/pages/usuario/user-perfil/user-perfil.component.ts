import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { PerfilUsuario, Usuario } from '../../../interfaces/usuario';
import { UsuarioService } from '../../../core/services/usuario.service';
import { NotificacaoService } from '../../../core/services/notificacao.service';

@Component({
  selector: 'app-user-perfil',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatIconModule, NgIf, MatButtonModule, MatDividerModule],
  templateUrl: './user-perfil.component.html',
  styleUrl: './user-perfil.component.css'
})
export class UserPerfilComponent implements OnInit {
  usuario: PerfilUsuario = {
    codigo_usuario: '',
    codigo_usuario_integracao: '',
    configuracoes: {
      gemini_token: '',
      openai_token: ''
    },
    data_cadastro: '',
    email: '',
    foto: null,
    nome: ''
  }

  senha: string = ''
  confirma_senha: string = ''

  constructor(private userService : UsuarioService,
    private notificador: NotificacaoService) {

  }

  ngOnInit(): void {
    this.userService.buscarPerfilUsuario().subscribe((response) => {
      this.usuario = response;
    })
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.usuario.foto = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }

  alterarUsuario() {
    this.userService.alterarPerfilUsuario(this.usuario).subscribe({
      next: (value) => {
        this.notificador.exibirNorificacao('Perfil atualizado com sucesso!', 'Fechar', 'success')
      },
      error: (err) => {
        console.log('exception...', err);
        this.notificador.exibirNorificacao('Erro ao atualizar o perfil.', 'Fechar', 'error')
      }
    });
  }

  alterarConfiguracoes() {

  }

  alterarSenha() {

  }
}
