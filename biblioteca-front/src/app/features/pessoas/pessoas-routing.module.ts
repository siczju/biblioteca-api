import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListaPessoasComponent } from './pages/lista-pessoas/lista-pessoas.component';
import { CadastroPessoaComponent } from './pages/cadastro-pessoa/cadastro-pessoa.component';

const routes: Routes = [
  {
    path: '',
    component: ListaPessoasComponent
  },

  {
    path: 'cadastro',
    component: CadastroPessoaComponent
  }
]


@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PessoasRoutingModule { }
