package com.julio.biblioteca_api.controller;

import com.julio.biblioteca_api.dto.LoginRequestDTO;
import com.julio.biblioteca_api.dto.LoginResponseDTO;
import com.julio.biblioteca_api.service.PessoaService;
import com.julio.biblioteca_api.service.UsuarioLogadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private PessoaService pessoaService;

    @Autowired
    private UsuarioLogadoService usuarioLogadoService;

    @PostMapping
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequestDTO) {

        return ResponseEntity.ok(
                pessoaService.login(loginRequestDTO.cpf())
        );
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {

        usuarioLogadoService.limpar();

        return ResponseEntity.noContent().build();
    }
}