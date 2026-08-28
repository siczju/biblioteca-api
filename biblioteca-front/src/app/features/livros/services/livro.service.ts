import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Livro } from '../models/livro.model';
import { Pagina } from 'src/app/models/pagina.model';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly apiUrl = 'http://localhost:8080/livros';

  constructor(private http: HttpClient) {}

  listarLivros(
    pagina: number,
    itens: number,
    titulo?: string
  ): Observable<Pagina<Livro>> {

    let params = new HttpParams()
      .set('pagina', pagina)
      .set('itens', itens);

    if (titulo) {
      params = params.set('titulo', titulo);
    }

    return this.http.get<Pagina<Livro>>(
      this.apiUrl,
      { params }
    );
  }
}