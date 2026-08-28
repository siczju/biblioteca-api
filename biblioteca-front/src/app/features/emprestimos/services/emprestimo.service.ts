import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MeuEmprestimo } from '../models/meu-emprestimo.model';
import { Pagina } from '../../../models/pagina.model';

import { Emprestimo } from './../models/emprestimo.model';
import { EmprestimoStatus } from './../../../enums/emprestimo-status.enum';

import { CriarEmprestimo } from '../models/criar-emprestimo.model';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoService {

  private readonly apiUrl = 'http://localhost:8080/emprestimos';

  constructor(private http: HttpClient) {}

  cadastrarEmprestimo(emprestimo: CriarEmprestimo): Observable<any> {
    return this.http.post(
      this.apiUrl,
      emprestimo,
      {
        withCredentials: true
      }
    );
  }

  listarEmprestimos(
    pagina: number,
    itens: number,
    pessoaId?: number,
    status?: EmprestimoStatus
  ): Observable<Pagina<Emprestimo>> {

  let params = new HttpParams()
    .set('pagina', pagina)
    .set('itens', itens);

  if (pessoaId !== undefined) {
    params = params.set('pessoaId', pessoaId);
  }

  if (status !== undefined) {
    params = params.set('status', status);
  }

  return this.http.get<Pagina<Emprestimo>>(
    this.apiUrl,
    {
      params,
      withCredentials: true
    }
  );
}

  meusEmprestimos(pagina: number, itens: number): Observable<Pagina<MeuEmprestimo>> {

    const params = new HttpParams().set('pagina', pagina).set('itens', itens);

    return this.http.get<Pagina<MeuEmprestimo>>(
      `${this.apiUrl}/meus`,
      {
        params,
        withCredentials: true
      }
    );
  }
}