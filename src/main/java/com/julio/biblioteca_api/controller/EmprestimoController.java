package com.julio.biblioteca_api.controller;

import com.julio.biblioteca_api.dto.CriarEmprestimoDTO;
import com.julio.biblioteca_api.dto.EmprestimoResponseDTO;
import com.julio.biblioteca_api.dto.PageResponseDTO;
import com.julio.biblioteca_api.entidades.Emprestimo;
import com.julio.biblioteca_api.service.EmprestimoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/emprestimos")
public class EmprestimoController {

    @Autowired
    private EmprestimoService emprestimoService;

    @PostMapping
    public ResponseEntity<Emprestimo> emprestar(
            @RequestBody CriarEmprestimoDTO criarEmprestimoDTO) {

        Emprestimo emprestimo = emprestimoService.emprestar(
                criarEmprestimoDTO.pessoaId(),
                criarEmprestimoDTO.livroId()
        );

        return ResponseEntity
                .created(URI.create("/emprestimos/" + emprestimo.getId()))
                .body(emprestimo);
    }

    @GetMapping
    public ResponseEntity<PageResponseDTO<EmprestimoResponseDTO>> findAll(
            @RequestParam int pagina,
            @RequestParam int itens) {

        return ResponseEntity.ok(
                emprestimoService.findAll(pagina, itens)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmprestimoResponseDTO> findById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                emprestimoService.findById(id)
        );
    }

    @PutMapping("/devolver/{id}")
    public ResponseEntity<Void> devolver(@PathVariable Long id) {
        emprestimoService.devolver(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        emprestimoService.deleteEmprestimo(id);
        return ResponseEntity.noContent().build();
    }
}