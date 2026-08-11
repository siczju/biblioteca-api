package com.julio.biblioteca_api.controller;

import com.julio.biblioteca_api.dto.CreateUserDTO;
import com.julio.biblioteca_api.entidades.Pessoa;
import com.julio.biblioteca_api.service.PessoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/pessoas")
public class PessoaController {

    @Autowired
    private PessoaService pessoaService;

    @PostMapping
    public ResponseEntity<Pessoa> insert(@RequestBody CreateUserDTO createUserDTO) {

        Pessoa pessoa = pessoaService.insert(createUserDTO);

        return ResponseEntity.created(URI.create("/pessoas/" + pessoa.getId())).body(pessoa);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pessoa> update(@PathVariable("id") Long id, @RequestBody CreateUserDTO createUserDTO) {
        Pessoa pessoa =  pessoaService.update(id, createUserDTO);

        return ResponseEntity.ok().body(pessoa);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pessoa> getPessoaById(@PathVariable("id") Long id) {
        Pessoa pessoa = pessoaService.getPessoaById(id);

        return ResponseEntity.ok().body(pessoa);
    }

    @GetMapping
    public ResponseEntity<List<Pessoa>> getAllPessoas() {
        List<Pessoa> pessoas = pessoaService.getAllPessoas();

        return ResponseEntity.ok().body(pessoas);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePessoa(@PathVariable Long id) {
        pessoaService.deletePessoa(id);
        return ResponseEntity.noContent().build();
    }
}
