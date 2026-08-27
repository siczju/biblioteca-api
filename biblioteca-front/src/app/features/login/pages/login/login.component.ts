import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      cpf: ['', Validators.required]
    });
  }

  entrar(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const cpf = this.loginForm.value.cpf;

    this.loginService.login(cpf).subscribe({
      next: (resposta) => {
        console.log('Login realizado com sucesso!', resposta);
      },
      error: (erro) => {
        console.error('Erro ao realizar login:', erro);
      }
    });
  }
}