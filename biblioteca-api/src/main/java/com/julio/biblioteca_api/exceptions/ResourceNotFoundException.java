package com.julio.biblioteca_api.exceptions;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(){ super("Recurso não encontrado!"); }
}
