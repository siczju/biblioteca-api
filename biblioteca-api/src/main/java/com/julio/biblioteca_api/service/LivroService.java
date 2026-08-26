package com.julio.biblioteca_api.service;

import com.julio.biblioteca_api.dto.LivroResponseDTO;
import com.julio.biblioteca_api.dto.PageResponseDTO;
import com.julio.biblioteca_api.entidades.Livro;
import com.julio.biblioteca_api.exceptions.ResourceNotFoundException;
import com.julio.biblioteca_api.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class LivroService {

    @Autowired
    private LivroRepository livroRepository;

    public Livro insert(Livro livro){
        return livroRepository.save(livro);
    }

    public Livro update(Long id, Livro livro){
        Livro livroOriginal = getLivroEntityById(id);

        livroOriginal.updateLivro(
                livro.getTitulo(),
                livro.getDescricao(),
                livro.getCategoria(),
                livro.getAutor(),
                livro.getStatus()
        );

        return livroRepository.save(livroOriginal);
    }

    public void deleteLivro(Long id){
        livroRepository.delete(getLivroEntityById(id));
    }

    public PageResponseDTO<LivroResponseDTO> getAllLivros(int pagina, int itens) {

        Page<Livro> livros =
                livroRepository.findAll(PageRequest.of(pagina, itens));

        Page<LivroResponseDTO> dtos =
                livros.map(this::toDTO);

        return new PageResponseDTO<>(
                dtos.getContent(),
                livros.getNumber(),
                livros.getTotalPages(),
                livros.getTotalElements(),
                livros.getSize(),
                livros.isFirst(),
                livros.isLast()
        );
    }

    public LivroResponseDTO getLivroById(Long id) {
        Optional<Livro> livro = livroRepository.findById(id);

        if (livro.isEmpty())
            throw new ResourceNotFoundException("Livro não encontrado!");

        return toDTO(livro.get());
    }

    public Livro getLivroEntityById(Long id) {
        Optional<Livro> livro = livroRepository.findById(id);

        if (livro.isEmpty())
            throw new ResourceNotFoundException("Livro não encontrado!");

        return livro.get();
    }

    public LivroResponseDTO toDTO(Livro livro) {
        return new LivroResponseDTO(
                livro.getId(),
                livro.getTitulo(),
                livro.getDescricao(),
                livro.getCategoria(),
                livro.getAutor(),
                livro.getStatus()
        );
    }

    public PageResponseDTO<LivroResponseDTO> findByTitulo(
            String titulo, int pagina, int itens) {

        Page<Livro> livros =
                livroRepository.findByTituloContainingIgnoreCase(
                        titulo,
                        PageRequest.of(pagina, itens)
                );

        Page<LivroResponseDTO> dtos =
                livros.map(this::toDTO);

        return new PageResponseDTO<>(
                dtos.getContent(),
                livros.getNumber(),
                livros.getTotalPages(),
                livros.getTotalElements(),
                livros.getSize(),
                livros.isFirst(),
                livros.isLast()
        );
    }

}
