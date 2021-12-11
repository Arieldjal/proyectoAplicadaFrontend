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
  selector: 'app-bitacora-transacciones-rango-meses',
  templateUrl: './bitacora-transacciones-rango-meses.component.html',
  styleUrls: ['./bitacora-transacciones-rango-meses.component.css']
})
export class BitacoraTransaccionesRangoMesesComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  toPrint: any = [];
  displayedColumns: string[] = ['IdBitacoraAuditoria', 'TransaccionDescripcion',  'Descripcion', 'NombreCompleto', 'FechaHora', 'IdSolicitud'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  meses: any[];
  mesRango1: any;
  mesRango2: any;
  currentDate = new Date();
  mesesForm: FormGroup;

  constructor(private reportesService: ReportesService, private snackbarService: SnackbarService, private datePipe: DatePipe) { 
    this.meses = [{mes: 'Enero', valor: 1}, {mes: 'Febrero', valor: 2}, {mes: 'Marzo', valor: 3}, {mes: 'Abril', valor: 4}, {mes: 'Mayo', valor: 5}, 
    {mes: 'Junio', valor: 6}, {mes: 'Julio', valor: 7}, {mes: 'Agosto', valor: 8}, {mes: 'Septiembre', valor: 9}, {mes: 'Octubre', valor: 10},
    {mes: 'Noviembre', valor: 11}, {mes: 'Diciembre', valor: 12}];

    this.mesesForm = new FormGroup({
      mesInicio: new FormControl('', [Validators.required]),
      mesFin: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {}

  search(){
    if(this.mesRango1>this.mesRango2){
      let temp = this.mesRango2;
      this.mesRango2 = this.mesRango1;
      this.mesRango1 = temp;
    }

    this.mesesForm.controls['mesInicio'].setValue(this.mesRango1);
    this.mesesForm.controls['mesFin'].setValue(this.mesRango2);
    
    if (!this.mesesForm.valid) {
      this.snackbarService.openSnackBar("Por favor ingresar un mes de inicio y fin");
      return;
    }

    this.reportesService.getBitacoraRangoMeses(this.mesesForm.value).subscribe((result) => {
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

  downloadAsPdf() {
    let date = new Date();
    let formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    const data = []

    this.toPrint.forEach(element => {
      let e = []
      e.push(element.IdBitacoraAuditoria)
      e.push(element.TransaccionDescripcion)
      e.push(element.Descripcion)
      e.push(element.NombreCompleto)
      e.push(element.FechaHora)
      e.push(element.IdSolicitud)
      data.push(e)
    });

    console.log(data)

    let doc = new jsPDF('p', 'mm', 'a4');
    autoTable(doc, {
      head: [['IdBitacoraAuditoria', 'TransaccionDescripcion',  'Descripcion', 'NombreCompleto', 'FechaHora', 'IdSolicitud']],
      body: data
    });
    doc.save('Reporte: Transacciones por rango de meses - '+formattedDate+'.pdf')
  }

}
