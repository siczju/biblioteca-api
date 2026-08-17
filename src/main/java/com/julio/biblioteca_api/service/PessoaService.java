package com.julio.biblioteca_api.service;

import com.julio.biblioteca_api.dto.CriarUsuarioDTO;
import com.julio.biblioteca_api.dto.LoginResponseDTO;
import com.julio.biblioteca_api.dto.PageResponseDTO;
import com.julio.biblioteca_api.dto.PessoaResponseDTO;
import com.julio.biblioteca_api.entidades.Pessoa;
import com.julio.biblioteca_api.exceptions.CpfAlreadyExistsException;
import com.julio.biblioteca_api.exceptions.ResourceNotFoundException;
import com.julio.biblioteca_api.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PessoaService {

    @Autowired
    private PessoaRepository pessoaRepository;

    public Pessoa insert(CriarUsuarioDTO createUserDTO){

        if(pessoaRepository.existsByCpf(createUserDTO.cpf()))
            throw new CpfAlreadyExistsException();

        Pessoa pessoa = new Pessoa(createUserDTO.nome(), createUserDTO.cpf(), createUserDTO.email(), createUserDTO.telefone());
        return pessoaRepository.save(pessoa);
    }

    public Pessoa update(Long id, CriarUsuarioDTO createUserDTO) {
        Pessoa pessoa = getPessoaEntityById(id);

        if (!pessoa.getCpf().equals(createUserDTO.cpf())
                && pessoaRepository.existsByCpf(createUserDTO.cpf())) {
            throw new CpfAlreadyExistsException();
        }

        pessoa.updatePessoa(createUserDTO.nome(), createUserDTO.cpf(), createUserDTO.email(), createUserDTO.telefone());

        return pessoaRepository.save(pessoa);
    }

    public PessoaResponseDTO getPessoaById(Long id) {
        Optional<Pessoa> pessoaOptional = pessoaRepository.findById(id);

        if(pessoaOptional.isEmpty())
            throw new ResourceNotFoundException("Pessoa não encontrada!");

        return toDTO(pessoaOptional.get());
    }

    public Pessoa getPessoaEntityById(Long id) {
        Optional<Pessoa> pessoaOptional = pessoaRepository.findById(id);

        if(pessoaOptional.isEmpty())
            throw new ResourceNotFoundException("Pessoa não encontrada!");

        return pessoaOptional.get();
    }

    public PageResponseDTO<PessoaResponseDTO> getAllPessoas(int pagina, int itens) {

        Page<Pessoa> pessoas =
                pessoaRepository.findAll(PageRequest.of(pagina, itens));

        Page<PessoaResponseDTO> dtos =
                pessoas.map(this::toDTO);

        return new PageResponseDTO<>(
                dtos.getContent(),
                pessoas.getNumber(),
                pessoas.getTotalPages(),
                pessoas.getTotalElements(),
                pessoas.getSize(),
                pessoas.isFirst(),
                pessoas.isLast()
        );
    }

    public void deletePessoa(Long id){
        pessoaRepository.delete(getPessoaEntityById(id));
    }

    public PessoaResponseDTO toDTO(Pessoa pessoa) {
        return new PessoaResponseDTO(
                pessoa.getId(),
                pessoa.getNome(),
                pessoa.getCpf(),
                pessoa.getEmail(),
                pessoa.getTelefone()
        );
    }

    public PageResponseDTO<PessoaResponseDTO> findByNome(
            String nome, int pagina, int itens) {

        Page<Pessoa> pessoas =
                pessoaRepository.findByNomeContainingIgnoreCase(
                        nome,
                        PageRequest.of(pagina, itens)
                );

        Page<PessoaResponseDTO> dtos =
                pessoas.map(this::toDTO);

        return new PageResponseDTO<>(
                dtos.getContent(),
                pessoas.getNumber(),
                pessoas.getTotalPages(),
                pessoas.getTotalElements(),
                pessoas.getSize(),
                pessoas.isFirst(),
                pessoas.isLast()
        );
    }

    public PageResponseDTO<PessoaResponseDTO> findByCpf(
            String cpf, int pagina, int itens) {

        Page<Pessoa> pessoas =
                pessoaRepository.findByCpfContaining(
                        cpf,
                        PageRequest.of(pagina, itens)
                );

        Page<PessoaResponseDTO> dtos =
                pessoas.map(this::toDTO);

        return new PageResponseDTO<>(
                dtos.getContent(),
                pessoas.getNumber(),
                pessoas.getTotalPages(),
                pessoas.getTotalElements(),
                pessoas.getSize(),
                pessoas.isFirst(),
                pessoas.isLast()
        );
    }

    public LoginResponseDTO login(String cpf) {

        Optional<Pessoa> pessoaOptional = pessoaRepository.findByCpf(cpf);

        if (pessoaOptional.isEmpty()) {
            throw new ResourceNotFoundException("CPF não cadastrado!");
        }

        Pessoa pessoa = pessoaOptional.get();

        return new LoginResponseDTO(
                pessoa.getId(),
                pessoa.getNome(),
                pessoa.getCpf()
        );
    }

}