import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { NovoUsuario, Usuario } from '../../../interfaces/usuario';
import { UsuarioService } from '../../../core/services/usuario.service';
import { NotificacaoService } from '../../../core/services/notificacao.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-empresa-criar-usuario',
  standalone: true,
  imports: [MatButtonModule, FormsModule, RouterModule, MatFormFieldModule, MatInputModule],
  templateUrl: './empresa-criar-usuario.component.html',
  styleUrl: './empresa-criar-usuario.component.css'
})

export class EmpresaCriarUsuarioComponent {
  usuario: NovoUsuario = {
    codigo_usuario_integracao: '',
    email: '',
    nome: '',
    senha: '',
    confirma_senha: ''
  }
  constructor(private userService: UsuarioService,
    private router: Router,
    private notificador: NotificacaoService) {

  }

  criarUsuario() {
    this.userService.criarUsuario(this.usuario).subscribe({
      next: (value) => {
        this.notificador.exibirNorificacao('Usuario criado com sucesso', 'Ok', 'success');
        this.router.navigate(['/empresa/usuarios']);
      },
      error: (err) => {
        console.log('exception...', err);
        this.notificador.exibirNorificacao('Erro ao criar usuario', 'Ok', 'error');
      }
    });
  }
}
