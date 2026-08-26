import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaPessoasComponent } from './pages/lista-pessoas/lista-pessoas.component';
import { CadastroPessoaComponent } from './pages/cadastro-pessoa/cadastro-pessoa.component';



@NgModule({
  declarations: [
    ListaPessoasComponent,
    CadastroPessoaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PessoasModule { }
