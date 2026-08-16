package com.julio.biblioteca_api.repository;

import com.julio.biblioteca_api.entidades.Emprestimo;
import com.julio.biblioteca_api.enums.EmprestimoStatus;
import com.julio.biblioteca_api.enums.LivroStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long> {
    Page<Emprestimo> findAll(Pageable pageable);
    Page<Emprestimo> findByPessoaId(Long pessoaId, Pageable pageable);
    Page<Emprestimo> findByStatus(EmprestimoStatus status, Pageable pageable);
}
