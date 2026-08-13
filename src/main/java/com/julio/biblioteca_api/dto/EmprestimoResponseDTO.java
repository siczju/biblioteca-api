package com.julio.biblioteca_api.dto;

import java.time.LocalDate;

public record EmprestimoResponseDTO(Long id, String pessoa, String livro, LocalDate dataDoEmprestimo, LocalDate dataDoVencimentoDoEmprestimo,  LocalDate dataDoRetorno
) {}
