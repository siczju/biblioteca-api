package com.julio.biblioteca_api.exceptions;

public class CpfAlreadyExistsException extends RuntimeException {
    public CpfAlreadyExistsException(String message) {
        super(message);
    }
    public CpfAlreadyExistsException(){ super("CPF já está cadastrado!"); }
}
