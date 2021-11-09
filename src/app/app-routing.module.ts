import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { FuncionarioComponent } from './main/mantenimiento/funcionario/funcionario.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login'}
  },
  {
    path: 'main',
    canActivate: [AuthGuard],
    component: MainComponent,
    data: { title: 'Main'}
  },
  {
    path: 'funcionario',
    canActivate: [AuthGuard],
    component: FuncionarioComponent,
    data: { title: 'Funcionario'}
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
