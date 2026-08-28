import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { EmprestimoService } from '../../services/emprestimo.service';
import { PessoaService } from '../../../pessoas/services/pessoa.service';
import { LivroService } from '../../../livros/services/livro.service';

import { Pessoa } from '../../../pessoas/models/pessoa.model';
import { Livro } from '../../../livros/models/livro.model';
import { LivroStatus } from '../../../../enums/livro-status.enum';
import { Pagina } from '../../../../models/pagina.model';

@Component({
  selector: 'app-cadastro-emprestimo',
  templateUrl: './cadastro-emprestimo.component.html',
  styleUrls: ['./cadastro-emprestimo.component.scss']
})
export class CadastroEmprestimoComponent implements OnInit {

  emprestimoForm!: FormGroup;

  pessoas: Pessoa[] = [];
  livros: Livro[] = [];

  salvando = false;
  carregando = false;

  readonly LivroStatus = LivroStatus;

  constructor(
    private fb: FormBuilder,
    private emprestimoService: EmprestimoService,
    private pessoaService: PessoaService,
    private livroService: LivroService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.emprestimoForm = this.fb.group({
      pessoaId: [null, Validators.required],
      livroId: [null, Validators.required]
    });

    this.carregarDados();
  }

  carregarDados(): void {
    this.carregando = true;

    this.pessoaService
      .listarPessoas(0, 100)
      .subscribe({
        next: (resposta: Pagina<Pessoa>) => {
          this.pessoas = resposta.content;

          this.livroService
            .listarLivros(0, 100)
            .subscribe({
              next: (respostaLivros: Pagina<Livro>) => {
                this.livros = respostaLivros.content.filter(
                  livro => livro.status === LivroStatus.DISPONIVEL
                );

                this.carregando = false;
              },

              error: (erro) => {
                console.error('Erro ao buscar livros:', erro);
                this.carregando = false;
              }
            });
        },

        error: (erro) => {
          console.error('Erro ao buscar pessoas:', erro);
          this.carregando = false;
        }
      });
  }

  cadastrar(): void {

    if (this.emprestimoForm.invalid) {
      this.emprestimoForm.markAllAsTouched();
      return;
    }

    this.salvando = true;

    const emprestimo = this.emprestimoForm.value;

    this.emprestimoService
      .cadastrarEmprestimo(emprestimo)
      .subscribe({
        next: (resposta) => {
          console.log(
            'Empréstimo cadastrado com sucesso!',
            resposta
          );

          this.salvando = false;

          this.router.navigate(['/emprestimos']);
        },

        error: (erro) => {
          console.error(
            'Erro ao cadastrar empréstimo:',
            erro
          );

          this.salvando = false;
        }
      });
  }

  cancelar(): void {
    this.router.navigate(['/emprestimos']);
  }

}