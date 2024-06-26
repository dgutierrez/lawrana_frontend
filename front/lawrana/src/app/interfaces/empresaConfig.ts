export interface EmpresaConfig {
  disponibiliza_pasta_empresa: boolean,
  senha_padrao: string,
  disponibiliza_token_openai: boolean,
  disponibiliza_token_gemini: boolean,
  disponibiliza_aws_claude: boolean,
  url_status_usuario: string,
  tamanho_armazenamento: number,
  openai_token: string,
  gemini_token: string,
  qtd_claude_token: number;
}
