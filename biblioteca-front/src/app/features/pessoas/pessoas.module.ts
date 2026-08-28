import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaPessoasComponent } from './pages/lista-pessoas/lista-pessoas.component';
import { CadastroPessoaComponent } from './pages/cadastro-pessoa/cadastro-pessoa.component';
import { PessoasRoutingModule } from './pessoas-routing.module';

import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    ListaPessoasComponent,
    CadastroPessoaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PessoasRoutingModule,

    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class PessoasModule { }
