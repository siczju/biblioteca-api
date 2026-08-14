package com.julio.biblioteca_api.dto;

public record PessoaResponseDTO(
        Long id,
        String nome,
        String cpf,
        String email,
        String telefone
) {}
