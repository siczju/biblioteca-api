package com.julio.biblioteca_api.dto;

import java.time.LocalDate;

public record MeuEmprestimoResponseDTO(
        Long emprestimoId,
        Long livroId,
        String livroTitulo,
        LocalDate dataDoEmprestimo,
        LocalDate dataDoVencimentoDoEmprestimo,
        LocalDate dataDoRetorno,
        long diasEmprestado,
        boolean atrasado
) {}
