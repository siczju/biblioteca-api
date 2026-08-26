package com.julio.biblioteca_api.infra;

import com.julio.biblioteca_api.exceptions.BookUnavailableException;
import com.julio.biblioteca_api.exceptions.CpfAlreadyExistsException;
import com.julio.biblioteca_api.exceptions.LoanLimitExceededException;
import com.julio.biblioteca_api.exceptions.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<RestErrorMessage> resourceNotFoundHandler(ResourceNotFoundException exception){
        RestErrorMessage treatResponse = new RestErrorMessage(HttpStatus.NOT_FOUND, exception.getMessage());
        return ResponseEntity.status(treatResponse.getStatus()).body(treatResponse);
    }

    @ExceptionHandler(CpfAlreadyExistsException.class)
    public ResponseEntity<RestErrorMessage> cpfAlreadyExistsHandler(CpfAlreadyExistsException exception){
        RestErrorMessage treatResponse = new RestErrorMessage(HttpStatus.CONFLICT, exception.getMessage());
        return ResponseEntity.status(treatResponse.getStatus()).body(treatResponse);
    }

    @ExceptionHandler(LoanLimitExceededException.class)
    public ResponseEntity<RestErrorMessage> loanLimitExceededHandler(LoanLimitExceededException exception){
        RestErrorMessage treatResponse = new RestErrorMessage(HttpStatus.BAD_REQUEST, exception.getMessage());
        return ResponseEntity.status(treatResponse.getStatus()).body(treatResponse);
    }

    @ExceptionHandler(BookUnavailableException.class)
    public ResponseEntity<RestErrorMessage> bookUnavaibleHandler(BookUnavailableException exception) {
        RestErrorMessage treatResponse = new RestErrorMessage(HttpStatus.BAD_REQUEST, exception.getMessage());
        return ResponseEntity.status(treatResponse.getStatus()).body(treatResponse);
    }

}
