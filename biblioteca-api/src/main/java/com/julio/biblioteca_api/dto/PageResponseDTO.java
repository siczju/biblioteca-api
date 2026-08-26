package com.julio.biblioteca_api.dto;

import java.util.List;

public record PageResponseDTO<T>(
        List<T> content,
        int paginaAtual,
        int totalPaginas,
        long totalElementos,
        int tamanhoPagina,
        boolean primeiraPagina,
        boolean ultimaPagina
) {}