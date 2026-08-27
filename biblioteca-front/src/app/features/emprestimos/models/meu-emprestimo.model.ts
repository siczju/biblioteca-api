export interface MeuEmprestimo {
  emprestimoId: number;
  livroId: number;
  livroTitulo: string;
  dataDoEmprestimo: string;
  dataDoVencimentoDoEmprestimo: string;
  dataDoRetorno: string | null;
  diasEmprestado: number;
  atrasado: boolean;
}