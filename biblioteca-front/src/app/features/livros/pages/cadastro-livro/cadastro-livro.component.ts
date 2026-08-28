import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { LivroService } from '../../services/livro.service';
import { LivroStatus } from './../../../../enums/livro-status.enum';

@Component({
  selector: 'app-cadastro-livro',
  templateUrl: './cadastro-livro.component.html',
  styleUrls: ['./cadastro-livro.component.scss']
})
export class CadastroLivroComponent implements OnInit {

  livroForm!: FormGroup;

  salvando = false;

  constructor(
    private fb: FormBuilder,
    private livroService: LivroService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.livroForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      categoria: ['', Validators.required],
      autor: ['', Validators.required]
    });
  }

  cadastrar(): void {

    if (this.livroForm.invalid) {
      this.livroForm.markAllAsTouched();
      return;
    }

    this.salvando = true;

    const livro = {
      ...this.livroForm.value,
      status: LivroStatus.DISPONIVEL
    };

    this.livroService.cadastrarLivro(livro).subscribe({
      next: (resposta) => {
        console.log('Livro cadastrado com sucesso!', resposta);

        this.salvando = false;

        this.router.navigate(['/livros']);
      },

      error: (erro) => {
        console.error('Erro ao cadastrar livro:', erro);

        this.salvando = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/livros']);
  }

}