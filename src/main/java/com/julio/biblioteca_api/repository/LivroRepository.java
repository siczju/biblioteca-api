package com.julio.biblioteca_api.repository;

import com.julio.biblioteca_api.entidades.Livro;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LivroRepository extends JpaRepository<Livro,Long> {
    Page<Livro> findByTituloContainingIgnoreCase(String titulo, Pageable pageable);
}
