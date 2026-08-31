import { Component, OnInit } from '@angular/core';

import { LivroService } from '../../services/livro.service';
import { Livro } from '../../models/livro.model';
import { Pagina } from 'src/app/models/pagina.model';
import { LivroStatus } from 'src/app/enums/livro-status.enum';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.scss']
})
export class ListaLivrosComponent implements OnInit {

  livros: Livro[] = [];

  colunas: string[] = [
    'titulo',
    'descricao',
    'categoria',
    'autor',
    'status',
    'acoes'
  ];

  paginaAtual = 0;
  itensPorPagina = 10;
  totalPaginas = 0;

  tituloBusca = '';
  carregando = false;

  readonly LivroStatus = LivroStatus;

  constructor(
    private livroService: LivroService
  ) {}

  ngOnInit(): void {
    this.buscarLivros();
  }

  buscarLivros(): void {
    this.carregando = true;

    this.livroService
      .listarLivros(
        this.paginaAtual,
        this.itensPorPagina,
        this.tituloBusca
      )
      .subscribe({
        next: (resposta: Pagina<Livro>) => {
          this.livros = resposta.content;
          this.paginaAtual = resposta.paginaAtual;
          this.totalPaginas = resposta.totalPaginas;

          this.carregando = false;
        },

        error: (erro) => {
          console.error('Erro ao buscar livros:', erro);
          this.carregando = false;
        }
      });
  }

  pesquisar(): void {
    this.paginaAtual = 0;
    this.buscarLivros();
  }

  limparBusca(): void {
    this.tituloBusca = '';
    this.paginaAtual = 0;
    this.buscarLivros();
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 0) {
      this.paginaAtual--;
      this.buscarLivros();
    }
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas - 1) {
      this.paginaAtual++;
      this.buscarLivros();
    }
  }

}