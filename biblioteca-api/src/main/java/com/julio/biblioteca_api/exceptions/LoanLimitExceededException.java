package com.julio.biblioteca_api.exceptions;

public class LoanLimitExceededException extends RuntimeException {
    public LoanLimitExceededException(String message) {
        super(message);
    }
    public LoanLimitExceededException(){ super("A pessoa já possui 3 empréstimos ativos!"); }
}
