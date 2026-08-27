import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListaEmprestimosComponent } from './pages/lista-emprestimos/lista-emprestimos.component';
import { MeusEmprestimosComponent } from './pages/meus-emprestimos/meus-emprestimos.component';
import { CadastroEmprestimoComponent } from './pages/cadastro-emprestimo/cadastro-emprestimo.component';

const routes: Routes = [
  {
    path: '',
    component: ListaEmprestimosComponent
  },

  {
    path: 'meus',
    component: MeusEmprestimosComponent
  },
  
  {
    path: 'cadastro',
    component: CadastroEmprestimoComponent
  }

]


@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class EmprestimosRoutingModule { }
