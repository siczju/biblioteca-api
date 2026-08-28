import { LivroStatus } from '../../../enums/livro-status.enum';

export interface CriarLivro {
  titulo: string;
  descricao: string;
  categoria: string;
  autor: string;
  status: LivroStatus;
}