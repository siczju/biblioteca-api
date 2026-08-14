package com.julio.biblioteca_api.dto;

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
        String status,
        boolean atrasado
) {}
