import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { PessoaService } from '../../services/pessoa.service';

@Component({
  selector: 'app-cadastro-pessoa',
  templateUrl: './cadastro-pessoa.component.html',
  styleUrls: ['./cadastro-pessoa.component.scss']
})
export class CadastroPessoaComponent implements OnInit {

  pessoaForm!: FormGroup;

  salvando = false;

  constructor(
    private fb: FormBuilder,
    private pessoaService: PessoaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pessoaForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required]
    });
  }

  cadastrar(): void {

    if (this.pessoaForm.invalid) {
      this.pessoaForm.markAllAsTouched();
      return;
    }

    this.salvando = true;

    const pessoa = this.pessoaForm.value;

    this.pessoaService.cadastrarPessoa(pessoa).subscribe({
      next: (resposta) => {
        console.log('Pessoa cadastrada com sucesso!', resposta);

        this.salvando = false;

        this.router.navigate(['/pessoas']);
      },

      error: (erro) => {
        console.error('Erro ao cadastrar pessoa:', erro);

        this.salvando = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/pessoas']);
  }

}