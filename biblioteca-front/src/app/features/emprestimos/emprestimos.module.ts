import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaEmprestimosComponent } from './pages/lista-emprestimos/lista-emprestimos.component';
import { MeusEmprestimosComponent } from './pages/meus-emprestimos/meus-emprestimos.component';



@NgModule({
  declarations: [
    ListaEmprestimosComponent,
    MeusEmprestimosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EmprestimosModule { }
