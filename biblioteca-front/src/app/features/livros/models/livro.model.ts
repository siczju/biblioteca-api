import { LivroStatus } from '../../../enums/livro-status.enum';

export interface Livro {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  autor: string;
  status: LivroStatus;
}