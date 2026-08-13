package com.julio.biblioteca_api.service;

import com.julio.biblioteca_api.dto.EmprestimoResponseDTO;
import com.julio.biblioteca_api.entidades.Emprestimo;
import com.julio.biblioteca_api.entidades.Livro;
import com.julio.biblioteca_api.entidades.Pessoa;
import com.julio.biblioteca_api.enums.LivroStatus;
import com.julio.biblioteca_api.exceptions.BookUnavailableException;
import com.julio.biblioteca_api.exceptions.LoanLimitExceededException;
import com.julio.biblioteca_api.exceptions.ResourceNotFoundException;
import com.julio.biblioteca_api.repository.EmprestimoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EmprestimoService {

    @Autowired
    private EmprestimoRepository emprestimoRepository;

    @Autowired
    private PessoaService pessoaService;

    @Autowired
    private LivroService livroService;

    public Emprestimo emprestar(Long pessoaId, Long livroId) {
        Pessoa pessoa = pessoaService.getPessoaById(pessoaId);
        Livro livro = livroService.getLivroById(livroId);

        long quantidade = contarQtdeEmprestimos(pessoa);

        if(quantidade >= 3)
            throw new LoanLimitExceededException();

        boolean livroEmprestado = livroJaEmprestado(livro);

        if(livroEmprestado)
            throw new BookUnavailableException();

        Emprestimo emprestimo = new Emprestimo(pessoa, livro);

        livro.updateStatusEmprestado();

        return emprestimoRepository.save(emprestimo);
    }

    public EmprestimoResponseDTO toDTO(Emprestimo emprestimo) {
        return new EmprestimoResponseDTO(
                emprestimo.getId(),
                emprestimo.getPessoa().getNome(),
                emprestimo.getLivro().getTitulo(),
                emprestimo.getDataDoEmprestimo(),
                emprestimo.getDataDoVencimentoDoEmprestimo(),
                emprestimo.getDataDoRetorno()
        );
    }

    public long contarQtdeEmprestimos(Pessoa pessoa){
        List<Emprestimo> emprestimos = emprestimoRepository.findAll();

        long quantidade = (emprestimos.stream()
                .filter(e -> e.getPessoa().equals(pessoa))
                .filter(e -> e.getLivro().getStatus().equals(LivroStatus.EMPRESTADO))
                .count());

        return quantidade;
    }

    public boolean livroJaEmprestado(Livro livro){
        boolean existe = emprestimoRepository.findAll().stream()
                .anyMatch(e ->
                        e.getLivro().equals(livro)
                                && e.getLivro().getStatus().equals(LivroStatus.EMPRESTADO)
                );

        return existe;
    }

    public void devolver(Long id) {
        Emprestimo emprestimo = findEntityById(id);

        emprestimo.devolver();
        emprestimo.getLivro().updateStatusDisponivel();

        emprestimoRepository.save(emprestimo);
    }

    public void deleteEmprestimo(Long id) {

        Emprestimo emprestimo = findEntityById(id);
        emprestimo.getLivro().updateStatusDisponivel();

        emprestimoRepository.delete(emprestimo);
    }

    public List<EmprestimoResponseDTO> findAll() {
        List<Emprestimo> emprestimos = emprestimoRepository.findAll();
        List<EmprestimoResponseDTO> dtos = new ArrayList<>();

        for(Emprestimo emprestimo : emprestimos) {
            dtos.add(toDTO(emprestimo));
        }

        return dtos;
    }

    public EmprestimoResponseDTO findById(Long id) {
        Optional<Emprestimo> emprestimoOptional = emprestimoRepository.findById(id);

        if (emprestimoOptional.isEmpty())
            throw new ResourceNotFoundException("Empréstimo não encontrado!");

        return toDTO(emprestimoOptional.get());
    }

    public Emprestimo findEntityById(Long id) {
        Optional<Emprestimo> emprestimoOptional = emprestimoRepository.findById(id);

        if (emprestimoOptional.isEmpty())
            throw new ResourceNotFoundException("Empréstimo não encontrado!");

        return emprestimoOptional.get();
    }
}

