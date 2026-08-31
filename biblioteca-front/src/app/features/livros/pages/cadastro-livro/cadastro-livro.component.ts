import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';

import { Router, ActivatedRoute  } from '@angular/router';

import { LivroService } from '../../services/livro.service';
import { LivroStatus } from './../../../../enums/livro-status.enum';
import { CriarLivro } from '../../models/criar-livro.model'
import { Livro } from '../../models/livro.model';;
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastro-livro',
  templateUrl: './cadastro-livro.component.html',
  styleUrls: ['./cadastro-livro.component.scss']
})
export class CadastroLivroComponent implements OnInit {

  livroForm!: FormGroup;
  livroOriginal?: Livro;

  idLivro?: number;
  
  editando = false;
  salvando = false;

  constructor(
    private fb: FormBuilder,
    private livroService: LivroService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.livroForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      categoria: ['', Validators.required],
      autor: ['', Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id'); // pega o id da url: /livros/editar/5

    if (id) {
      this.idLivro = Number(id); // id vem como string ent tem q fazer o cast
      this.editando = true;

      this.carregarLivro();
    }

  }

  carregarLivro(): void {
    this.livroService.getLivroById(this.idLivro!).subscribe({
      next: (livro) => {

        this.livroOriginal = livro;

        this.livroForm.patchValue({ // não atualizar nem status nem id, só os campos do form
          titulo: livro.titulo,
          descricao: livro.descricao,
          categoria: livro.categoria,
          autor: livro.autor
        });

      },

      error: (erro) => {
        console.error('Erro ao carregar livro:', erro);
        this.router.navigate(['/livros']);
      }
    });
  }

  cadastrar(): void {
    if (this.livroForm.invalid) {
      this.livroForm.markAllAsTouched();
      return;
    }

    this.salvando = true;

    const status = this.editando && this.livroOriginal
      ? this.livroOriginal.status
      : LivroStatus.DISPONIVEL;

    const livro: CriarLivro = {
      ...this.livroForm.value,
      status
    };

    if (this.editando && this.idLivro) {

      this.livroService
        .editarLivro(this.idLivro, livro)
        .subscribe({
          next: (resposta) => {
            this.snackBar.open('Livro atualizado com sucesso!', 'Fechar', {duration: 3000});

            console.log('Livro atualizado com sucesso!', resposta);

            this.salvando = false;
            this.router.navigate(['/livros']);
          },

          error: (erro) => {
              this.salvando = false;

              this.snackBar.open('Erro ao salvar livro!', 'Fechar', {duration: 3000});

              console.error('Erro ao salvar livro:', erro); 
            }
        });

      return;
    }

    this.livroService
      .cadastrarLivro(livro)
      .subscribe({
        next: (resposta) => {
          this.snackBar.open('Livro cadastrado com sucesso!', 'Fechar', {duration: 3000});

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