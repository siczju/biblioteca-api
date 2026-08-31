import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaLivrosComponent } from './pages/lista-livros/lista-livros.component';
import { CadastroLivroComponent } from './pages/cadastro-livro/cadastro-livro.component';
import { LivrosRoutingModule } from './livros-routing.module';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from "@angular/material/card";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    ListaLivrosComponent,
    CadastroLivroComponent
  ],
  imports: [
    CommonModule,
    LivrosRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule
]
})
export class LivrosModule { }
