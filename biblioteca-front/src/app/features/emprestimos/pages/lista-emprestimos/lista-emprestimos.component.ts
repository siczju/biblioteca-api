import { Component, OnInit } from '@angular/core';

import { EmprestimoService } from '../../services/emprestimo.service';
import { Emprestimo } from '../../models/emprestimo.model';
import { EmprestimoStatus } from './../../../../enums/emprestimo-status.enum';
import { Pagina } from '../../../../models/pagina.model';

@Component({
  selector: 'app-lista-emprestimos',
  templateUrl: './lista-emprestimos.component.html',
  styleUrls: ['./lista-emprestimos.component.scss']
})
export class ListaEmprestimosComponent implements OnInit {

  emprestimos: Emprestimo[] = [];

  colunas: string[] = [
    'pessoa',
    'livro',
    'dataEmprestimo',
    'vencimento',
    'retorno',
    'dias',
    'status',
    'acoes'
  ];

  paginaAtual = 0;
  itensPorPagina = 10;
  totalPaginas = 0;

  pessoaId?: number;
  status?: EmprestimoStatus;

  carregando = false;

  readonly EmprestimoStatus = EmprestimoStatus;

  constructor(
    private emprestimoService: EmprestimoService
  ) {}

  ngOnInit(): void {
    this.buscarEmprestimos();
  }

  excluirEmprestimo(id: number): void {

    if (!confirm('Tem certeza que deseja excluir este empréstimo?')) {
      return;
    }

    this.emprestimoService.excluirEmprestimo(id).subscribe({
      next: () => {
        console.log('Empréstimo excluído com sucesso!');
        this.buscarEmprestimos();
      },

      error: (erro) => {
        console.error('Erro ao excluir empréstimo:', erro);
      }
    });
  }

  devolver(id: number): void {

    this.emprestimoService.devolverEmprestimo(id).subscribe({
      next: () => {
        console.log('Empréstimo devolvido com sucesso!');
        this.buscarEmprestimos();
      },

      error: (erro) => {
        console.error('Erro ao devolver empréstimo:', erro);
      }
    });
  }

  buscarEmprestimos(): void {
    this.carregando = true;

    this.emprestimoService
      .listarEmprestimos(
        this.paginaAtual,
        this.itensPorPagina,
        this.pessoaId,
        this.status
      )
      .subscribe({
        next: (resposta: Pagina<Emprestimo>) => {
          this.emprestimos = resposta.content;
          this.paginaAtual = resposta.paginaAtual;
          this.totalPaginas = resposta.totalPaginas;

          this.carregando = false;
        },

        error: (erro) => {
          console.error('Erro ao buscar empréstimos:', erro);
          this.carregando = false;
        }
      });
  }

  filtrarPorPessoa(): void {
    this.status = undefined;
    this.paginaAtual = 0;
    this.buscarEmprestimos();
  }

  filtrarPorStatus(): void {
    this.pessoaId = undefined;
    this.paginaAtual = 0;
    this.buscarEmprestimos();
  }

  limparFiltros(): void {
    this.pessoaId = undefined;
    this.status = undefined;
    this.paginaAtual = 0;
    this.buscarEmprestimos();
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 0) {
      this.paginaAtual--;
      this.buscarEmprestimos();
    }
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas - 1) {
      this.paginaAtual++;
      this.buscarEmprestimos();
    }
  }

}