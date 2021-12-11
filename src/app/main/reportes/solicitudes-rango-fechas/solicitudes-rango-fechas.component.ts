import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportesService } from '../../../service/reportes/reportes.service';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from '../../../snackbar/snackbar.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-solicitudes-rango-fechas',
  templateUrl: './solicitudes-rango-fechas.component.html',
  styleUrls: ['./solicitudes-rango-fechas.component.css']
})
export class SolicitudesRangoFechasComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  toPrint: any = [];
  displayedColumns: string[] = ['IdSolicitud', 'NombreProyecto', 'NombreCompleto', 'FechaHora', 'FechaInicio', 'FechaFin', 'Terminado'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  fechaRango1: any;
  fechaRango2: any;
  currentDate = new Date();
  fechasForm: FormGroup;

  constructor(private reportesService: ReportesService, private snackbarService: SnackbarService, private datePipe: DatePipe) {
    this.fechasForm = new FormGroup({
      fechaInicio: new FormControl('', [Validators.required]),
      fechaFin: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  search() {
    this.fechasForm.controls['fechaInicio'].setValue(this.fechaRango1);
    this.fechasForm.controls['fechaFin'].setValue(this.fechaRango2);

    if (!this.fechasForm.valid) {
      this.snackbarService.openSnackBar("Por favor ingresar una fecha de inicio y fin");
      return;
    }

    this.reportesService.getSolicitudesRangoFechas(this.fechasForm.value).subscribe((result) => {
      if (result) {
        this.toPrint = result;
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    }, (err) => {
      console.log(err);
    });
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  checkState(bool): string {
    if (bool) {
      return "Terminado";
    }
    else
      return "Pendiente"
  }

  downloadAsPdf() {
    let date = new Date();
    let formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    const data = []

    this.toPrint.forEach(element => {
      let e = []
      e.push(element.IdSolicitud)
      e.push(element.NombreProyecto)
      e.push(element.NombreCompleto)
      e.push(element.FechaHora)
      e.push(element.FechaInicio)
      e.push(element.FechaFin)
      e.push(this.checkState(element.Terminado))
      data.push(e)
    });

    console.log(data)

    let doc = new jsPDF('p', 'mm', 'a4');
    autoTable(doc, {
      head: [['IdSolicitud', 'NombreProyecto', 'NombreCompleto', 'FechaHora', 'FechaInicio', 'FechaFin', 'Estado']],
      body: data
    });
    doc.save('Reporte: Solicitudes por rango de fechas - '+formattedDate+'.pdf')
  }

}
