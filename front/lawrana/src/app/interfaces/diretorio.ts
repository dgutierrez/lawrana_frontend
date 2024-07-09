export interface Diretorio {
  codigo_diretorio: string,
  codigo_proprietario: string,
  nome_diretorio: string,
  codigo_diretorio_pai: string,
  caminho_diretorio: string,
  sub_diretorios: Diretorio[],
  documentos: Documento[]
}

export interface Documento {
  codigo_documento: string,
  nome_documento: string
}
