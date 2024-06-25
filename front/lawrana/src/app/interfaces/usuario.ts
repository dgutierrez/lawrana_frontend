
export interface Usuario {
  codigo_usuario: string,
  nome: string,
  email: string,
  codigo_usuario_integracao: string,
  data_cadastro: string
}

export interface NovoUsuario {
  codigo_usuario_integracao: string,
  email: string,
  nome: string,
  senha: string,
  confirma_senha: string
}

export interface UsuarioPaginador {
  qtd_usuarios: number,
  qtd_paginas: number,
  usuarios: Usuario[]
}

export interface ConfigUsuario {
  openai_token: string,
  gemini_token: string
}

export interface PerfilUsuario extends Usuario {
  foto: string | ArrayBuffer | null,
  configuracoes: ConfigUsuario
}
