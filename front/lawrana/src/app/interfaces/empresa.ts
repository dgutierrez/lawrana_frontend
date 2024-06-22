export interface Empresa {
  user: string,
  nome: string,
  email: string,
  data_cadastro: string,
  foto: string | ArrayBuffer | null,
  foto_login: string | ArrayBuffer | null;
}
