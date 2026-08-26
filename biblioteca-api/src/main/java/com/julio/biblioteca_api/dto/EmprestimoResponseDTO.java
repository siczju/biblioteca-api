package com.julio.biblioteca_api.dto;

import com.julio.biblioteca_api.entidades.Emprestimo;
import com.julio.biblioteca_api.enums.EmprestimoStatus;

import java.time.LocalDate;

public record EmprestimoResponseDTO(
        Long id,
        Long pessoaId,
        String pessoaNome,
        Long livroId,
        String livroTitulo,
        LocalDate dataDoEmprestimo,
        LocalDate dataDoVencimentoDoEmprestimo,
        LocalDate dataDoRetorno,
        long diasEmprestado,
        EmprestimoStatus status,
        boolean atrasado
) {}
