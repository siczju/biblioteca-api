package com.julio.biblioteca_api.entidades;

import com.julio.biblioteca_api.enums.EmprestimoStatus;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Objects;

@Getter
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "tb_emprestimo")
public class Emprestimo {

    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pessoa_id")
    private Pessoa pessoa;

    @ManyToOne
    @JoinColumn(name = "livro_id")
    private Livro livro;

    @Enumerated(EnumType.STRING)
    private EmprestimoStatus status;

    private LocalDate dataDoEmprestimo;

    private LocalDate dataDoVencimentoDoEmprestimo;

    private LocalDate dataDoRetorno;

    public Emprestimo(Pessoa pessoa, Livro livro) {
        this.pessoa = pessoa;
        this.livro = livro;
        this.dataDoEmprestimo = LocalDate.now();
        this.dataDoVencimentoDoEmprestimo = LocalDate.now().plusDays(7);
        this.status = EmprestimoStatus.EMPRESTADO;
    }

    public void devolver() {
        this.dataDoRetorno = LocalDate.now();
        this.status = EmprestimoStatus.DEVOLVIDO;
    }

}
