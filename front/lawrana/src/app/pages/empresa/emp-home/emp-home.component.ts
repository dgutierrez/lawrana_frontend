import { Component, OnInit, signal } from '@angular/core';
import { NavigatorComponent } from '../../../shared/navigator/navigator.component';
import { ViewerComponent } from '../../../shared/viewer/viewer.component';
import { MenuItem } from '../../../shared/meu-sidenav/meu-sidenav.component';
import { EmpresaService } from '../../../core/services/empresa.service';
import { Empresa } from '../../../interfaces/empresa';
import { response } from 'express';
import { PerfilUsuario } from '../../../interfaces/usuario';

@Component({
  selector: 'app-emp-home',
  standalone: true,
  imports: [NavigatorComponent, ViewerComponent],
  templateUrl: './emp-home.component.html',
  styleUrl: './emp-home.component.css'
})
export class EmpHomeComponent implements OnInit {
  usuarioMenuItems = signal<MenuItem[]>([
    {
      icon: 'source_environment',
      label: 'Perfil',
      route: 'perfil'
    },
    {
      icon: 'toggle_on',
      label: 'Configurações',
      route: 'configuracoes'
    },
    {
      icon: 'supervisor_account',
      label: 'Usuarios',
      route: 'usuarios'
    },
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'dash'
    }
  ])

  empresa: Empresa = {
    configuracoes: {
      claude_token: '',
      disponibiliza_pasta_empresa: false,
      disponibiliza_token_empresa: false,
      gemini_token: '',
      openai_token: '',
      tamanho_armazenamento: 1,
      url_status_usuario: ''
    },
    data_cadastro: '',
    email: '',
    foto: null,
    foto_login: null,
    nome: 'emp',
    user: ''
  }

  perfilUser: PerfilUsuario = {
    codigo_usuario: '',
    codigo_usuario_integracao: '',
    configuracoes:  {
      openai_token: '',
      gemini_token: ''
    },
    data_cadastro: '',
    email: '',
    foto: null,
    nome: 'teste'
  }

  constructor(private empresaService: EmpresaService) {

  }

  ngOnInit(): void {
    console.log('carregando emp')
    this.empresaService.buscarEmpresa().subscribe((response) => {
      this.empresa = response;

      this.perfilUser.nome = this.empresa.nome;
      this.perfilUser.foto = this.empresa.foto_login;

      console.log('Empresa = ')
      console.log(this.empresa.nome)
      console.log('perfilUser = ')
      console.log(this.perfilUser.nome)
    });
  }
}
