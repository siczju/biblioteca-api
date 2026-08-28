import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaEmprestimosComponent } from './pages/lista-emprestimos/lista-emprestimos.component';
import { MeusEmprestimosComponent } from './pages/meus-emprestimos/meus-emprestimos.component';
import { EmprestimosRoutingModule } from './emprestimos-routing.module';
import { CadastroEmprestimoComponent } from './pages/cadastro-emprestimo/cadastro-emprestimo.component';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';


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
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ]
})
export class EmprestimosModule { }
