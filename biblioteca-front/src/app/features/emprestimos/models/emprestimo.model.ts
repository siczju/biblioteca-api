import { EmprestimoStatus } from './../../../enums/emprestimo-status.enum';

export interface Emprestimo {
  id: number;
  pessoaId: number;
  pessoaNome: string;
  livroId: number;
  livroTitulo: string;
  dataDoEmprestimo: string;
  dataDoVencimentoDoEmprestimo: string;
  dataDoRetorno: string | null;
  diasEmprestado: number;
  status: EmprestimoStatus;
  atrasado: boolean;
}