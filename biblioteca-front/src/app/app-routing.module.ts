import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
      path: 'login',
      loadChildren: () =>
        import('./features/login/login.module').then(
          m => m.LoginModule
      )
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'livros',
    loadChildren: () =>
      import('./features/livros/livros.module').then(m => m.LivrosModule)
  },

  {
    path: 'pessoas',
    loadChildren: () => import('./features/pessoas/pessoas.module').then(m => m.PessoasModule)
  },

  {
  path: 'emprestimos',
    loadChildren: () =>
      import('./features/emprestimos/emprestimos.module').then(
        m => m.EmprestimosModule
      )
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
