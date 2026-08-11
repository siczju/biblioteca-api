package com.julio.biblioteca_api.controller;

import com.julio.biblioteca_api.entidades.Livro;
import com.julio.biblioteca_api.service.LivroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/livros")
public class LivroController {

    @Autowired
    private LivroService livroService;

    @PostMapping
    public ResponseEntity<Livro> insert(@RequestBody Livro livro){
        livroService.insert(livro);

        return ResponseEntity.created(URI.create("/livros" + livro.getId())).body(livro);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        livroService.deleteLivro(id);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Livro> update(@PathVariable Long id, @RequestBody Livro livro){
        livroService.update(id, livro);

        return ResponseEntity.ok().body(livro);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Livro> get(@PathVariable("id") Long id){
        return ResponseEntity.ok().body(livroService.getLivroById(id));
    }

    @GetMapping
    public ResponseEntity<List<Livro>> getAll(){
        return ResponseEntity.ok().body(livroService.getAllLivros());
    }

}
