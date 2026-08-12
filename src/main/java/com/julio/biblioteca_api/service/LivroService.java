package com.julio.biblioteca_api.service;

import com.julio.biblioteca_api.entidades.Livro;
import com.julio.biblioteca_api.enums.LivroStatus;
import com.julio.biblioteca_api.exceptions.ResourceNotFoundException;
import com.julio.biblioteca_api.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class LivroService {

    @Autowired
    private LivroRepository livroRepository;

    public Livro insert(Livro livro){
        return livroRepository.save(livro);
    }

    public Livro update(Long id, Livro livro){
        Livro livroOriginal = getLivroById(id);

        livroOriginal.updateLivro(livro.getTitulo(), livro.getDescricao(), livro.getCategoria(), livro.getStatus());

        return livroRepository.save(livroOriginal);
    }

    public void deleteLivro(Long id){
        livroRepository.delete(getLivroById(id));
    }

    public List<Livro> getAllLivros(){
        return livroRepository.findAll();
    }

    public Livro getLivroById(Long id){
        Optional<Livro> livro = livroRepository.findById(id);

        if(livro.isEmpty())
            throw new ResourceNotFoundException("Livro não encontrado!");

        return livro.get();
    }


}
