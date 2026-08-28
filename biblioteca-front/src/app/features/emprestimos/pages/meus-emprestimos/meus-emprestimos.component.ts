import { Component, OnInit } from '@angular/core';

import { EmprestimoService } from '../../services/emprestimo.service';
import { MeuEmprestimo } from '../../models/meu-emprestimo.model';
import { Pagina } from 'src/app/models/pagina.model';

@Component({
  selector: 'app-meus-emprestimos',
  templateUrl: './meus-emprestimos.component.html',
  styleUrls: ['./meus-emprestimos.component.scss']
})
export class MeusEmprestimosComponent implements OnInit {

  emprestimos: MeuEmprestimo[] = [];

  colunas: string[] = ['livro','dataEmprestimo','vencimento','retorno','dias','status'];

  paginaAtual = 0;
  itensPorPagina = 10;
  totalPaginas = 0;

  carregando = false;

  constructor(
    private emprestimoService: EmprestimoService
  ) {}

  ngOnInit(): void {
    this.buscarEmprestimos();
  }

  buscarEmprestimos(): void {
    this.carregando = true;

    this.emprestimoService.meusEmprestimos(this.paginaAtual,this.itensPorPagina)
      .subscribe({
        next: (resposta: Pagina<MeuEmprestimo>) => {

          this.emprestimos = resposta.content;
          this.paginaAtual = resposta.paginaAtual;
          this.totalPaginas = resposta.totalPaginas;

          this.carregando = false;
        },

        error: (erro) => {console.error('Erro ao buscar meus empréstimos:',erro);

          this.carregando = false;
        }
      });
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