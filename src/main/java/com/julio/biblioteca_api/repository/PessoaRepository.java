package com.julio.biblioteca_api.repository;

import com.julio.biblioteca_api.entidades.Pessoa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PessoaRepository extends JpaRepository<Pessoa, Long> {
    boolean existsByCpf(String cpf);
    Page<Pessoa> findByNomeContainingIgnoreCase(String nome, Pageable pageable);
    Page<Pessoa> findByCpfContaining(String cpf, Pageable pageable);
}
