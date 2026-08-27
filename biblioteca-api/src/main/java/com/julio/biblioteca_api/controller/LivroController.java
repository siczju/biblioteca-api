package com.julio.biblioteca_api.controller;

import com.julio.biblioteca_api.dto.LivroResponseDTO;
import com.julio.biblioteca_api.dto.PageResponseDTO;
import com.julio.biblioteca_api.entidades.Livro;
import com.julio.biblioteca_api.service.LivroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@CrossOrigin
@RestController
@RequestMapping("/livros")
public class LivroController {

    @Autowired
    private LivroService livroService;

    @PostMapping
    public ResponseEntity<Livro> insert(@RequestBody Livro livro){
        livroService.insert(livro);

        return ResponseEntity.created(URI.create("/livros/" + livro.getId())).body(livro);
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
    public ResponseEntity<LivroResponseDTO> get(@PathVariable Long id){
        return ResponseEntity.ok().body(livroService.getLivroById(id));
    }

    @GetMapping
    public ResponseEntity<PageResponseDTO<LivroResponseDTO>> getAll(
            @RequestParam(required = false) String titulo,
            @RequestParam int pagina,
            @RequestParam int itens) {

        if (titulo == null || titulo.isBlank()) {
            return ResponseEntity.ok(
                    livroService.getAllLivros(pagina, itens)
            );
        }

        return ResponseEntity.ok(
                livroService.findByTitulo(titulo, pagina, itens)
        );
    }
}