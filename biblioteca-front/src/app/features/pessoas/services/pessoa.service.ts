import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Pessoa } from '../models/pessoa.model';
import { Pagina } from 'src/app/models/pagina.model';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private readonly apiUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) {}

  listarPessoas(
    pagina: number,
    itens: number,
    nome?: string,
    cpf?: string
  ): Observable<Pagina<Pessoa>> {

    let params = new HttpParams()
      .set('pagina', pagina)
      .set('itens', itens);

    if (nome) {
      params = params.set('nome', nome);
    }

    if (cpf) {
      params = params.set('cpf', cpf);
    }

    return this.http.get<Pagina<Pessoa>>(
      this.apiUrl,
      { params, withCredentials: true }
    );
  }
}