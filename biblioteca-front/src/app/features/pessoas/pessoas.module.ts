import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaPessoasComponent } from './pages/lista-pessoas/lista-pessoas.component';
import { CadastroPessoaComponent } from './pages/cadastro-pessoa/cadastro-pessoa.component';
import { PessoasRoutingModule } from './pessoas-routing.module';



@NgModule({
  declarations: [
    ListaPessoasComponent,
    CadastroPessoaComponent
  ],
  imports: [
    CommonModule,
    PessoasRoutingModule
  ]
})
export class PessoasModule { }
