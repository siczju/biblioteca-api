package com.julio.biblioteca_api.entidades;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.julio.biblioteca_api.enums.LivroStatus;
import jakarta.persistence.*;
import lombok.*;
import java.util.Set;

@Getter
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "tb_livro")
public class Livro {

    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    private String descricao;

    private String categoria;

    @Enumerated(EnumType.STRING)
    private LivroStatus status;

    @JsonIgnore
    @OneToMany(mappedBy = "livro")
    private Set<Emprestimo> emprestimos;

    public Livro(String titulo, String descricao, String categoria, LivroStatus status) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.categoria = categoria;
        this.status = status;
    }

    public Livro updateLivro(String titulo, String descricao, String categoria, LivroStatus status) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.categoria = categoria;
        this.status = status;

        return this;
    }

    public void updateStatusDisponivel() {
        this.status = LivroStatus.DISPONIVEL;
    }

    public void updateStatusEmprestado() {
        this.status = LivroStatus.EMPRESTADO;
    }

}
