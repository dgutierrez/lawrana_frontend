export interface Assistente {
  codigo_assistente?: string
  nome: string
  nome_modelo: string
  descricao: string
  contexto: string
  escopo: string
  editavel: boolean
  foto: string | ArrayBuffer | null;
}
