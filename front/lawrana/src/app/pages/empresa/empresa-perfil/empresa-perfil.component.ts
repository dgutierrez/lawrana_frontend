import { EmpresaConfig } from './../../../interfaces/empresaConfig';
import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../../interfaces/empresa';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { EmpresaService } from '../../../core/services/empresa.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificacaoService } from '../../../core/services/notificacao.service';

@Component({
  selector: 'app-empresa-perfil',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatIconModule, NgIf, MatButtonModule],
  templateUrl: './empresa-perfil.component.html',
  styleUrl: './empresa-perfil.component.css'
})
export class EmpresaPerfilComponent implements OnInit {
  empresa: Empresa = {
    data_cadastro: '',
    email: '',
    foto: '',
    foto_login: '',
    nome: '',
    user: '',
    configuracoes:  {
      claude_token: '',
      disponibiliza_pasta_empresa: false,
      disponibiliza_token_empresa: false,
      gemini_token: '',
      openai_token: '',
      tamanho_armazenamento: 1,
      url_status_usuario: ''
    }
  }

  constructor(private empresaService: EmpresaService,
    private notificador: NotificacaoService){

  }

  ngOnInit(): void {
    this.empresaService.buscarEmpresa().subscribe((response: Empresa) => {
      this.empresa = response;
      console.log('carregou os dados da empresa')
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.empresa.foto = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }

  onFileSelectedLogin(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.empresa.foto_login = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }

  alterarEmpresa(){
    this.empresaService.altearEmpresa(this.empresa).subscribe({
      next: (value) => {
        this.notificador.exibirNorificacao('Perfil atualizado com sucesso!', 'Fechar', 'success')
      },
      error: (err) => {
        console.log('exception...', err);
        this.notificador.exibirNorificacao('Erro ao atualizar o perfil.', 'Fechar', 'error')
      }
    });
  }
}
