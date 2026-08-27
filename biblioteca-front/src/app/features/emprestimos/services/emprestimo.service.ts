import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MeuEmprestimo } from '../models/meu-emprestimo.model';
import { Pagina } from '../../../models/pagina.model';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoService {

  private readonly apiUrl = 'http://localhost:8080/emprestimos';

  constructor(private http: HttpClient) {}

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