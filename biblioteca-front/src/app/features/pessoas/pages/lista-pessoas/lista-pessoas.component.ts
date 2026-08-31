import { Component, OnInit } from '@angular/core';

import { PessoaService } from '../../services/pessoa.service';
import { Pessoa } from '../../models/pessoa.model';
import { Pagina } from 'src/app/models/pagina.model';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    'telefone',
    'acoes'
  ];

  paginaAtual = 0;
  itensPorPagina = 10;
  totalPaginas = 0;

  filtro = '';
  tipoFiltro: 'nome' | 'cpf' = 'nome';

  carregando = false;

  constructor(
    private pessoaService: PessoaService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.buscarPessoas();
  }

  excluirPessoa(id: number): void {

    if (!confirm('Tem certeza que deseja excluir esta pessoa?')) {
      return;
    }

    this.pessoaService.excluirPessoa(id).subscribe({
      next: () => {
        this.snackBar.open('Pessoa excluída com sucesso!', 'Fechar', {duration: 3000});
        this.buscarPessoas();
      },

      error: (erro) => {
        this.snackBar.open('Erro ao excluir pessoa!', 'Fechar', {duration: 3000});
        console.error('Erro ao excluir pessoa:', erro);
      }
    });
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