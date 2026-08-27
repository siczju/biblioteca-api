import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaEmprestimosComponent } from './pages/lista-emprestimos/lista-emprestimos.component';
import { MeusEmprestimosComponent } from './pages/meus-emprestimos/meus-emprestimos.component';
import { EmprestimosRoutingModule } from './emprestimos-routing.module';
import { CadastroEmprestimoComponent } from './pages/cadastro-emprestimo/cadastro-emprestimo.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    ListaEmprestimosComponent,
    MeusEmprestimosComponent,
    CadastroEmprestimoComponent
  ],
  imports: [
    CommonModule,
    EmprestimosRoutingModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class EmprestimosModule { }
