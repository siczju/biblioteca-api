package com.julio.biblioteca_api.exceptions;

public class BookUnavailableException extends RuntimeException {
    public BookUnavailableException(String message) {
        super(message);
    }
    public BookUnavailableException(){ super("Livro ja foi emprestado!"); }
}
