package com.julio.biblioteca_api.controller;

import com.julio.biblioteca_api.dto.LoginRequestDTO;
import com.julio.biblioteca_api.dto.LoginResponseDTO;
import com.julio.biblioteca_api.service.PessoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private PessoaService pessoaService;

    @PostMapping
    public ResponseEntity<LoginResponseDTO> login(
            @RequestBody LoginRequestDTO loginRequestDTO) {

        return ResponseEntity.ok(
                pessoaService.login(loginRequestDTO.cpf())
        );
    }
}