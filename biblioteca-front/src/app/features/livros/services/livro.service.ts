import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Livro } from '../models/livro.model';
import { Pagina } from 'src/app/models/pagina.model';

import { CriarLivro } from '../models/criar-livro.model';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly apiUrl = 'http://localhost:8080/livros';

  constructor(private http: HttpClient) {}

  cadastrarLivro(livro: CriarLivro): Observable<Livro> {
    return this.http.post<Livro>(
      this.apiUrl,
      livro,
      {
        withCredentials: true
      }
    );
  } 

  excluirLivro(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
      {
        withCredentials: true
      }
    );
  }

  editarLivro(id: number, livro: CriarLivro): Observable<Livro> {
    return this.http.put<Livro>(
      `${this.apiUrl}/${id}`,
      livro,
      {
        withCredentials: true
      }
    );
  }

  getLivroById(id: number): Observable<Livro> {
    return this.http.get<Livro>(
      `${this.apiUrl}/${id}`,
      {
        withCredentials: true
      }
    );
  }

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