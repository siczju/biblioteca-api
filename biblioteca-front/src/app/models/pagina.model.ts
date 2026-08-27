export interface Pagina<T> {
  content: T[];
  paginaAtual: number;
  totalPaginas: number;
  totalElementos: number;
  tamanhoPagina: number;
  primeiraPagina: boolean;
  ultimaPagina: boolean;
}