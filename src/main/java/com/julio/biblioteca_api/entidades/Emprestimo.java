package com.julio.biblioteca_api.entidades;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "tb_emprestimo")
public class Emprestimo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pessoa_id")
    private Pessoa pessoa;

    @ManyToOne
    @JoinColumn(name = "livro_id")
    private Livro livro;

    private LocalDate dataDoEmprestimo;

    private LocalDate dataDoVencimentoDoEmprestimo;

    private LocalDate dataDoRetorno;

    public Livro getLivro() {
        return livro;
    }

    public void setLivro(Livro livro) {
        this.livro = livro;
    }

    public Pessoa getPessoa() {
        return pessoa;
    }

    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
    }

    public Emprestimo(){}

    public Emprestimo(Long id, LocalDate dataDoEmprestimo, LocalDate dataDoVencimentoDoEmprestimo, LocalDate dataDoRetorno) {
        this.id = id;
        this.dataDoEmprestimo = dataDoEmprestimo;
        this.dataDoVencimentoDoEmprestimo = dataDoVencimentoDoEmprestimo;
        this.dataDoRetorno = dataDoRetorno;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDataDoEmprestimo() {
        return dataDoEmprestimo;
    }

    public void setDataDoEmprestimo(LocalDate dataDoEmprestimo) {
        this.dataDoEmprestimo = dataDoEmprestimo;
    }

    public LocalDate getDataDoVencimentoDoEmprestimo() {
        return dataDoVencimentoDoEmprestimo;
    }

    public void setDataDoVencimentoDoEmprestimo(LocalDate dataDoVencimentoDoEmprestimo) {
        this.dataDoVencimentoDoEmprestimo = dataDoVencimentoDoEmprestimo;
    }

    public LocalDate getDataDoRetorno() {
        return dataDoRetorno;
    }

    public void setDataDoRetorno(LocalDate dataDoRetorno) {
        this.dataDoRetorno = dataDoRetorno;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Emprestimo that = (Emprestimo) o;
        return id == that.id;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
