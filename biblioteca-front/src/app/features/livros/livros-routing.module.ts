import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListaLivrosComponent } from './pages/lista-livros/lista-livros.component';
import { CadastroLivroComponent } from './pages/cadastro-livro/cadastro-livro.component';

const routes: Routes = [
  {
    path: '',
    component: ListaLivrosComponent
  },

  {
    path: 'cadastro',
    component: CadastroLivroComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LivrosRoutingModule { }
