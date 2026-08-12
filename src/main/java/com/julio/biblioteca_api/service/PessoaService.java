package com.julio.biblioteca_api.service;

import com.julio.biblioteca_api.dto.CriarUsuarioDTO;
import com.julio.biblioteca_api.entidades.Pessoa;
import com.julio.biblioteca_api.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PessoaService {

    @Autowired
    private PessoaRepository pessoaRepository;

    public Pessoa insert(CriarUsuarioDTO createUserDTO){
        Pessoa pessoa = new Pessoa(createUserDTO.name(), createUserDTO.cpf(), createUserDTO.email(), createUserDTO.telefone());
        return pessoaRepository.save(pessoa);
    }

    public Pessoa update(Long id, CriarUsuarioDTO createUserDTO) {
        Optional<Pessoa> pessoaOptional = pessoaRepository.findById(id);

        if(!pessoaOptional.isPresent()){
            return null;
        }

        Pessoa pessoaAtualizada = pessoaOptional.get();

        pessoaAtualizada.updatePessoa(createUserDTO.name(), createUserDTO.cpf(), createUserDTO.email(), createUserDTO.telefone());

        return pessoaRepository.save(pessoaAtualizada);
    }

    public Pessoa getPessoaById(Long id){
        Optional<Pessoa> pessoaOptional = pessoaRepository.findById(id);

        if(pessoaOptional.isPresent()){
            return pessoaOptional.get();
        }
        return null;
    }

    public List<Pessoa> getAllPessoas(){
        return pessoaRepository.findAll();
    }

    public void  deletePessoa(Long id){
        pessoaRepository.deleteById(id);
    }




}
