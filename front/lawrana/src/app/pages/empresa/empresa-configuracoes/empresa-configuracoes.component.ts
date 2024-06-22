import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../../interfaces/empresa';
import { EmpresaService } from '../../../core/services/empresa.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-empresa-configuracoes',
  standalone: true,
  imports: [MatSlideToggleModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './empresa-configuracoes.component.html',
  styleUrl: './empresa-configuracoes.component.css'
})
export class EmpresaConfiguracoesComponent implements OnInit {
  empresa: Empresa = {
    data_cadastro: '',
    email: '',
    foto: '',
    foto_login: '',
    nome: '',
    user: '',
    configuracoes:  {
      claude_token: '',
      disponibiliza_pasta_empresa: true,
      disponibiliza_token_empresa: true,
      gemini_token: '',
      openai_token: '',
      tamanho_armazenamento: 1,
      url_status_usuario: ''
    }
  }

  constructor(private empresaService: EmpresaService){

  }

  ngOnInit(): void {
    this.empresaService.buscarEmpresa().subscribe((response: Empresa) => {
      this.empresa = response;
      console.log('carregou os dados da empresa')
    });
  }

  alterarConfiguracaoEmpresa(){
    this.empresaService.altearConfigEmpresa(this.empresa.configuracoes).subscribe((response) => {
      console.log('configuração alterada');
    });
  }
}
