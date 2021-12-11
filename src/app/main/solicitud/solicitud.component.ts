import { Component, OnInit, ViewChild } from '@angular/core';
import { SolicitudService } from '../../service/solicitud/solicitud.service';
import { MatDialog } from '@angular/material/dialog';
import { AddSolicitudComponent } from './add-solicitud/add-solicitud.component';
import { DetailsSolicitudComponent } from './details-solicitud/details-solicitud.component';
import { EditSolicitudComponent } from './edit-solicitud/edit-solicitud.component';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from '../../snackbar/snackbar.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['IdSolicitud', 'NombreProyecto', 'FechaHora', 'FechaInicio', 'FechaFin', 'IdUsuarioAplicativo', 'IdResponsableTI', 'IdResponsableUsuarioFinal', 'Terminado', 'action'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private solicitudService: SolicitudService, private dialog: MatDialog, private snackbarService: SnackbarService) {

  }

  ngOnInit(): void {
    this.getSolicitudes();
  }

  openAddDialog() {
    this.dialog.open(AddSolicitudComponent, {
      panelClass: 'add-solicitud-dialog',
      width: '40%',
      autoFocus: false,
    }).afterClosed()
      .subscribe((res) => {
        if (res == true) {
          this.getSolicitudes();
        }
      });
  }

  getSolicitudes() {
    this.solicitudService.getSolicitudes().subscribe((data: any[]) => {
      if (data) {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }
    });
  }

  modify(idSolicitud) {
    this.dialog.open(EditSolicitudComponent, {
      panelClass: 'edit-solicitud-dialog',
      width: '50%',
      autoFocus: false,
      data: {
        dataKey: idSolicitud
      },
    }).afterClosed()
      .subscribe((res) => {
        if (res == true) {
          this.getSolicitudes();
        }
    });
  }

  details(idSolicitud) {
    this.dialog.open(DetailsSolicitudComponent, {
      panelClass: 'details-solicitud-dialog',
      width: '50%',
      autoFocus: false,
      data: {
        dataKey: idSolicitud
      }
    });
  }

  delete(idSolicitud) {
    if (confirm("¿Desea borrar la solicitud " + idSolicitud + "?")) {
      var idFuncionario = JSON.parse(sessionStorage.getItem('currentUser')).IdFuncionario;
      this.solicitudService.deleteSolicitud(idSolicitud, idFuncionario).subscribe(res => {
        if(res){
          this.snackbarService.openSnackBar("Solicitud " + idSolicitud + ": eliminada");
          this.getSolicitudes();
        } else {
          this.snackbarService.openSnackBar("Error al eliminar la solicitud " + idSolicitud);
        }
      });
    }
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  checkState(bool): string{
    if(bool){
      return "Terminado";
    }
    else
      return "Pendiente"
  }
}
