import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { FuncionarioComponent } from './main/mantenimiento/funcionario/funcionario.component';
import { DepartamentoComponent } from './main/mantenimiento/departamento/departamento.component';
import { SolicitudComponent } from './main/solicitud/solicitud.component';
import { AvanceComponent } from './main/avance/avance.component';
import { SolicitudesRangoFechasComponent } from './main/reportes/solicitudes-rango-fechas/solicitudes-rango-fechas.component';
import { BitacoraTransaccionesRangoMesesComponent } from './main/reportes/bitacora-transacciones-rango-meses/bitacora-transacciones-rango-meses.component';
import { GraficoAvancesComponent } from './main/reportes/grafico-avances/grafico-avances.component';
import { GraficoProyectosTerminadosPendientesComponent } from './main/reportes/grafico-proyectos-terminados-pendientes/grafico-proyectos-terminados-pendientes.component';
import { HistoricoAvanceTrimestralComponent } from './main/reportes/historico-avance-trimestral/historico-avance-trimestral.component';
import { ProyectosSolicitudesCambiosComponent } from './main/reportes/proyectos-solicitudes-cambios/proyectos-solicitudes-cambios.component';
import { SexoComponent } from './main/mantenimiento/sexo/sexo.component';
import { TrimestreComponent } from './main/mantenimiento/trimestre/trimestre.component';
import { TransaccionComponent } from './main/mantenimiento/transaccion/transaccion.component';

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
    path: 'departamento',
    canActivate: [AuthGuard],
    component: DepartamentoComponent,
    data: { title: 'Departamento'}
  },
  {
    path: 'sexo',
    canActivate: [AuthGuard],
    component: SexoComponent,
    data: { title: 'Sexo'}
  },
  {
    path: 'trimestre',
    canActivate: [AuthGuard],
    component: TrimestreComponent,
    data: { title: 'trimestre'}
  },
  {
    path: 'transaccion',
    canActivate: [AuthGuard],
    component: TransaccionComponent,
    data: { title: 'transaccion'}
  },
  {
    path: 'solicitud',
    canActivate: [AuthGuard],
    component: SolicitudComponent,
    data: { title: 'Solicitud'}
  },
  {
    path: 'avance',
    canActivate: [AuthGuard],
    component: AvanceComponent,
    data: { title: 'Avance'}
  },
  {
    path: 'reporte-solicitudes-rango-fechas',
    canActivate: [AuthGuard],
    component: SolicitudesRangoFechasComponent,
    data: { title: 'reporte-solictudes-fechas'}
  },
  {
    path: 'reporte-bitacora-transacciones-rango-meses',
    canActivate: [AuthGuard],
    component: BitacoraTransaccionesRangoMesesComponent,
    data: { title: 'reporte-bitacora-transacciones'}
  },
  {
    path: 'reporte-grafico-avances',
    canActivate: [AuthGuard],
    component: GraficoAvancesComponent,
    data: { title: 'reporte-grafico-avances'}
  },
  {
    path: 'reporte-grafico-proyectos-terminados-pendientes',
    canActivate: [AuthGuard],
    component: GraficoProyectosTerminadosPendientesComponent,
    data: { title: 'reporte-grafico-proyectos'}
  },
  {
    path: 'reporte-historico-avance-trimestral',
    canActivate: [AuthGuard],
    component: HistoricoAvanceTrimestralComponent,
    data: { title: 'reporte-historico-avance-trimestral'}
  },
  {
    path: 'reporte-proyecto-solicitudes-cambios',
    canActivate: [AuthGuard],
    component: ProyectosSolicitudesCambiosComponent,
    data: { title: 'reporte-proyecto-solicitudes-cambios'}
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
