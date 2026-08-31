import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/features/login/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router
) {}

  ngOnInit(): void {
  }

  logout(): void {
  this.loginService.logout().subscribe({
    next: () => {
      this.router.navigate(['/login']);
    },

    error: (erro) => {
      console.error('Erro ao fazer logout:', erro);
    }
  });
}

}
