package com.julio.biblioteca_api.infra;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public class RestErrorMessage {
    private HttpStatus status;
    private String message;
}
