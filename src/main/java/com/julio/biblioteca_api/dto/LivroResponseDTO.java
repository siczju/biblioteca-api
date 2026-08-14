package com.julio.biblioteca_api.dto;

import com.julio.biblioteca_api.enums.LivroStatus;

public record LivroResponseDTO(
        Long id,
        String titulo,
        String descricao,
        String categoria,
        LivroStatus status
) {}
