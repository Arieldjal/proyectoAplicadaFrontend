import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportesService } from '../../../service/reportes/reportes.service';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from '../../../snackbar/snackbar.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-proyectos-solicitudes-cambios',
  templateUrl: './proyectos-solicitudes-cambios.component.html',
  styleUrls: ['./proyectos-solicitudes-cambios.component.css']
})
export class ProyectosSolicitudesCambiosComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  toPrint: any = [];
  displayedColumns: string[] = ['IdBitacoraAuditoria', 'IdSolicitud', 'Descripcion', 'NombreCompleto', 'FechaHora'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  mesInicio: any;
  mesFin: any;
  currentDate = new Date();

  constructor(private reportesService: ReportesService,  private snackbarService: SnackbarService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getProyectos();
  }

  getProyectos(){
    this.reportesService.getProyectosCambiosSolicitados().subscribe((data: any[]) => {
      if (data) {
        this.toPrint = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  downloadAsPdf() {
    let date = new Date();
    let formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    const data = []

    this.toPrint.forEach(element => {
      let e = []
      e.push(element.IdBitacoraAuditoria)
      e.push(element.IdSolicitud)
      e.push(element.Descripcion)
      e.push(element.NombreCompleto)
      e.push(element.FechaHora)
      data.push(e)
    });

    console.log(data)

    let doc = new jsPDF('p', 'mm', 'a4');
    autoTable(doc, {
      head: [['IdBitacoraAuditoria', 'IdSolicitud', 'Descripcion', 'NombreCompleto', 'FechaHora']],
      body: data
    });
    doc.save('Reporte: Proyectos que han solicitado cambios - '+formattedDate+'.pdf')
  }

}
