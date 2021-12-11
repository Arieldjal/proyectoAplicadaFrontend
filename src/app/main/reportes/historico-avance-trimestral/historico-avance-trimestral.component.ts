import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportesService } from '../../../service/reportes/reportes.service';
import { SolicitudService } from '../../../service/solicitud/solicitud.service';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from '../../../snackbar/snackbar.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-historico-avance-trimestral',
  templateUrl: './historico-avance-trimestral.component.html',
  styleUrls: ['./historico-avance-trimestral.component.css']
})
export class HistoricoAvanceTrimestralComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  toPrint: any = [];
  displayedColumns: string[] = ['IdSolicitud', 'NombreProyecto', 'IdAvance', 'Trimestre', 'FechaHora', 'NombreCompleto', 'Terminado'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  trimestres: any[];
  trimestre: any;
  proyectos: any[];
  proyecto: any;
  searchForm: FormGroup;

  constructor(private reportesService: ReportesService, private snackbarService: SnackbarService, private solicitudService: SolicitudService, private datePipe: DatePipe) { 
    this.trimestres = [{trimestre: 'Enero - Marzo', valor: 1}, {trimestre: 'Abril - Junio', valor: 2}, 
    {trimestre: 'Julio - Setiembre', valor: 3}, {trimestre: 'Octubre - Diciembre', valor: 4}];
    this.getProyectos();

    this.searchForm = new FormGroup({
      trimestre: new FormControl(''),
      proyecto: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.search();
  }

  getProyectos() {
    this.solicitudService.getSolicitudesIds().subscribe((data: any[]) => {
      if (data) {
        this.proyectos = data;
      }
    });
  }

  search(){
    this.searchForm.controls['trimestre'].setValue(this.trimestre);
    this.searchForm.controls['proyecto'].setValue(this.proyecto);

    this.reportesService.getHistoricoAvances(this.searchForm.value).subscribe((result) => {
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

  checkState(bool): string{
    if(bool){
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
      e.push(element.IdAvance)
      e.push(element.Trimestre)
      e.push(element.FechaHora)
      e.push(element.NombreCompleto)
      e.push(this.checkState(element.Terminado))
      data.push(e)
    });

    console.log(data)

    let doc = new jsPDF('p', 'mm', 'a4');
    autoTable(doc, {
      head: [['IdSolicitud', 'NombreProyecto', 'IdAvance', 'Trimestre', 'FechaHora', 'NombreCompleto', 'Estado']],
      body: data
    });
    doc.save('Reporte: Historico avances por trimestre - '+formattedDate+'.pdf')
  }

}
