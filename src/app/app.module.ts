import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common'

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { FuncionarioComponent } from './main/mantenimiento/funcionario/funcionario.component';
import { SexoComponent } from './main/mantenimiento/sexo/sexo.component';
import { TrimestreComponent } from './main/mantenimiento/trimestre/trimestre.component';
import { DepartamentoComponent } from './main/mantenimiento/departamento/departamento.component';
import { TransaccionComponent } from './main/mantenimiento/transaccion/transaccion.component';
import { AddFuncionarioComponent } from './main/mantenimiento/funcionario/add-funcionario/add-funcionario.component';
import { EditFuncionarioComponent } from './main/mantenimiento/funcionario/edit-funcionario/edit-funcionario.component';
import { DetailsFuncionarioComponent } from './main/mantenimiento/funcionario/details-funcionario/details-funcionario.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SolicitudComponent } from './main/solicitud/solicitud.component';
import { AvanceComponent } from './main/avance/avance.component';
import { AddSolicitudComponent } from './main/solicitud/add-solicitud/add-solicitud.component';
import { EditSolicitudComponent } from './main/solicitud/edit-solicitud/edit-solicitud.component';
import { DetailsSolicitudComponent } from './main/solicitud/details-solicitud/details-solicitud.component';
import { AddAvanceComponent } from './main/avance/add-avance/add-avance.component';
import { EditAvanceComponent } from './main/avance/edit-avance/edit-avance.component';
import { DetailsAvanceComponent } from './main/avance/details-avance/details-avance.component';
import { SolicitudesRangoFechasComponent } from './main/reportes/solicitudes-rango-fechas/solicitudes-rango-fechas.component';
import { BitacoraTransaccionesRangoMesesComponent } from './main/reportes/bitacora-transacciones-rango-meses/bitacora-transacciones-rango-meses.component';
import { GraficoAvancesComponent } from './main/reportes/grafico-avances/grafico-avances.component';
import { GraficoProyectosTerminadosPendientesComponent } from './main/reportes/grafico-proyectos-terminados-pendientes/grafico-proyectos-terminados-pendientes.component';
import { HistoricoAvanceTrimestralComponent } from './main/reportes/historico-avance-trimestral/historico-avance-trimestral.component';
import { ProyectosSolicitudesCambiosComponent } from './main/reportes/proyectos-solicitudes-cambios/proyectos-solicitudes-cambios.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AddDepartamentoComponent } from './main/mantenimiento/departamento/add-departamento/add-departamento.component';
import { DetailsDepartamentoComponent } from './main/mantenimiento/departamento/details-departamento/details-departamento.component';
import { EditDepartamentoComponent } from './main/mantenimiento/departamento/edit-departamento/edit-departamento.component';
import { AddSexoComponent } from './main/mantenimiento/sexo/add-sexo/add-sexo.component';
import { DetailsSexoComponent } from './main/mantenimiento/sexo/details-sexo/details-sexo.component';
import { EditSexoComponent } from './main/mantenimiento/sexo/edit-sexo/edit-sexo.component';
import { AddTrimestreComponent } from './main/mantenimiento/trimestre/add-trimestre/add-trimestre.component';
import { DetailsTrimestreComponent } from './main/mantenimiento/trimestre/details-trimestre/details-trimestre.component';
import { EditTrimestreComponent } from './main/mantenimiento/trimestre/edit-trimestre/edit-trimestre.component';
import { AddTransaccionComponent } from './main/mantenimiento/transaccion/add-transaccion/add-transaccion.component';
import { DetailsTransaccionComponent } from './main/mantenimiento/transaccion/details-transaccion/details-transaccion.component';
import { EditTransaccionComponent } from './main/mantenimiento/transaccion/edit-transaccion/edit-transaccion.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    FuncionarioComponent,
    SexoComponent,
    TrimestreComponent,
    DepartamentoComponent,
    TransaccionComponent,
    AddFuncionarioComponent,
    EditFuncionarioComponent,
    DetailsFuncionarioComponent,
    NavBarComponent,
    SolicitudComponent,
    AvanceComponent,
    AddSolicitudComponent,
    EditSolicitudComponent,
    DetailsSolicitudComponent,
    AddAvanceComponent,
    EditAvanceComponent,
    DetailsAvanceComponent,
    SolicitudesRangoFechasComponent,
    BitacoraTransaccionesRangoMesesComponent,
    GraficoAvancesComponent,
    GraficoProyectosTerminadosPendientesComponent,
    HistoricoAvanceTrimestralComponent,
    ProyectosSolicitudesCambiosComponent,
    AddDepartamentoComponent,
    DetailsDepartamentoComponent,
    EditDepartamentoComponent,
    AddSexoComponent,
    DetailsSexoComponent,
    EditSexoComponent,
    AddTrimestreComponent,
    DetailsTrimestreComponent,
    EditTrimestreComponent,
    AddTransaccionComponent,
    DetailsTransaccionComponent,
    EditTransaccionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FormsModule,
    NgxChartsModule
  ],
  providers: [MatDatepickerModule, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
