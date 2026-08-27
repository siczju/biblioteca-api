import { Component, OnInit } from '@angular/core';
import { EmprestimoService } from '../../services/emprestimo.service';
import { MeuEmprestimo } from '../../models/meu-emprestimo.model';
import { Pagina } from '../../../../models/pagina.model';


@Component({
  selector: 'app-meus-emprestimos',
  templateUrl: './meus-emprestimos.component.html',
  styleUrls: ['./meus-emprestimos.component.scss']
})
export class MeusEmprestimosComponent implements OnInit {


  constructor(
    private emprestimoService: EmprestimoService
  ) {}

  ngOnInit(): void {
  }

}
