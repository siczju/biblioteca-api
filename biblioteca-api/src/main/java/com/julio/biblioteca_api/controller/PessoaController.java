package com.julio.biblioteca_api.controller;

import com.julio.biblioteca_api.dto.CriarUsuarioDTO;
import com.julio.biblioteca_api.dto.PageResponseDTO;
import com.julio.biblioteca_api.dto.PessoaResponseDTO;
import com.julio.biblioteca_api.entidades.Pessoa;
import com.julio.biblioteca_api.service.PessoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping(value = "/pessoas")
public class PessoaController {

    @Autowired
    private PessoaService pessoaService;

    @PostMapping
    public ResponseEntity<Pessoa> insert(@RequestBody CriarUsuarioDTO createUserDTO) {

        Pessoa pessoa = pessoaService.insert(createUserDTO);

        return ResponseEntity
                .created(URI.create("/pessoas/" + pessoa.getId()))
                .body(pessoa);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pessoa> update(
            @PathVariable("id") Long id,
            @RequestBody CriarUsuarioDTO createUserDTO) {

        Pessoa pessoa = pessoaService.update(id, createUserDTO);

        return ResponseEntity.ok().body(pessoa);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PessoaResponseDTO> getPessoaById(
            @PathVariable("id") Long id) {

        PessoaResponseDTO pessoa = pessoaService.getPessoaById(id);

        return ResponseEntity.ok().body(pessoa);
    }

    @GetMapping
    public ResponseEntity<PageResponseDTO<PessoaResponseDTO>> getAll(
            @RequestParam(required = false) String nome,
            @RequestParam(required = false) String cpf,
            @RequestParam int pagina,
            @RequestParam int itens) {

        if (nome != null && !nome.isBlank()) {
            return ResponseEntity.ok(
                    pessoaService.findByNome(nome, pagina, itens)
            );
        }

        if (cpf != null && !cpf.isBlank()) {
            return ResponseEntity.ok(
                    pessoaService.findByCpf(cpf, pagina, itens)
            );
        }

        return ResponseEntity.ok(
                pessoaService.getAllPessoas(pagina, itens)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePessoa(@PathVariable Long id) {
        pessoaService.deletePessoa(id);
        return ResponseEntity.noContent().build();
    }
}