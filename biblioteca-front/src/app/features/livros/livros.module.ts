import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaLivrosComponent } from './pages/lista-livros/lista-livros.component';
import { CadastroLivroComponent } from './pages/cadastro-livro/cadastro-livro.component';
import { LivrosRoutingModule } from './livros-routing.module';



@NgModule({
  declarations: [
    ListaLivrosComponent,
    CadastroLivroComponent
  ],
  imports: [
    CommonModule,
    LivrosRoutingModule
  ]
})
export class LivrosModule { }
