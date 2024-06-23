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
