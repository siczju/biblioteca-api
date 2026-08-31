import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';

import { Router, ActivatedRoute  } from '@angular/router';

import { PessoaService } from '../../services/pessoa.service';
import { Pessoa } from '../../models/pessoa.model';
import { CriarPessoa } from '../../models/criar-pessoa.model';

@Component({
  selector: 'app-cadastro-pessoa',
  templateUrl: './cadastro-pessoa.component.html',
  styleUrls: ['./cadastro-pessoa.component.scss']
})
export class CadastroPessoaComponent implements OnInit {

  pessoaForm!: FormGroup;

  idPessoa?: number;

  editando = false;
  salvando = false;

  constructor(
    private fb: FormBuilder,
    private pessoaService: PessoaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pessoaForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.idPessoa = Number(id);
      this.editando = true;

      this.carregarPessoa();
    }
      
  }

  carregarPessoa(): void {
  this.pessoaService.getPessoaById(this.idPessoa!).subscribe({
    next: (pessoa) => {

      this.pessoaForm.patchValue({
        nome: pessoa.nome,
        cpf: pessoa.cpf,
        email: pessoa.email,
        telefone: pessoa.telefone
      });

    },

    error: (erro) => {
      console.error('Erro ao carregar pessoa:', erro);
      this.router.navigate(['/pessoas']);
    }
  });
}

  cadastrar(): void {

    if (this.pessoaForm.invalid) {
      this.pessoaForm.markAllAsTouched();
      return;
    }

    this.salvando = true;

    const pessoa: CriarPessoa = this.pessoaForm.value;

    if (this.editando && this.idPessoa) {

      this.pessoaService.editarPessoa(this.idPessoa, pessoa)
        .subscribe({
          next: (resposta) => {
            console.log(
              'Pessoa atualizada com sucesso!',
              resposta
            );

            this.salvando = false;
            this.router.navigate(['/pessoas']);
          },

          error: (erro) => {
            console.error(
              'Erro ao atualizar pessoa:',
              erro
            );

            this.salvando = false;
          }
        });

      return;
    }

    this.pessoaService.cadastrarPessoa(pessoa)
      .subscribe({
        next: (resposta) => {
          console.log(
            'Pessoa cadastrada com sucesso!',
            resposta
          );

          this.salvando = false;
          this.router.navigate(['/pessoas']);
        },

        error: (erro) => {
          console.error(
            'Erro ao cadastrar pessoa:',
            erro
          );

          this.salvando = false;
        }
      });
  }

  cancelar(): void {
    this.router.navigate(['/pessoas']);
  }

}