import { Component, OnInit } from '@angular/core';

import { PessoaService } from '../../services/pessoa.service';
import { Pessoa } from '../../models/pessoa.model';
import { Pagina } from 'src/app/models/pagina.model';

@Component({
  selector: 'app-lista-pessoas',
  templateUrl: './lista-pessoas.component.html',
  styleUrls: ['./lista-pessoas.component.scss']
})
export class ListaPessoasComponent implements OnInit {

  pessoas: Pessoa[] = [];

  colunas: string[] = [
    'nome',
    'cpf',
    'email',
    'telefone'
  ];

  paginaAtual = 0;
  itensPorPagina = 10;
  totalPaginas = 0;

  filtro = '';
  tipoFiltro: 'nome' | 'cpf' = 'nome';

  carregando = false;

  constructor(
    private pessoaService: PessoaService
  ) {}

  ngOnInit(): void {
    this.buscarPessoas();
  }

  buscarPessoas(): void {
    this.carregando = true;

  let nome: string | undefined;
  let cpf: string | undefined;

  if (this.tipoFiltro === 'nome') {
    nome = this.filtro;
  } else {
    cpf = this.filtro;
  }

    this.pessoaService
      .listarPessoas(
        this.paginaAtual,
        this.itensPorPagina,
        nome,
        cpf
      )
      .subscribe({
        next: (resposta: Pagina<Pessoa>) => {
          this.pessoas = resposta.content;
          this.paginaAtual = resposta.paginaAtual;
          this.totalPaginas = resposta.totalPaginas;

          this.carregando = false;
        },

        error: (erro) => {
          console.error('Erro ao buscar pessoas:', erro);
          this.carregando = false;
        }
      });
  }

  pesquisar(): void {
    this.paginaAtual = 0;
    this.buscarPessoas();
  }

  limparBusca(): void {
    this.filtro = '';
    this.paginaAtual = 0;
    this.buscarPessoas();
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 0) {
      this.paginaAtual--;
      this.buscarPessoas();
    }
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas - 1) {
      this.paginaAtual++;
      this.buscarPessoas();
    }
  }

}