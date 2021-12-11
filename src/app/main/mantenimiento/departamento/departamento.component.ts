import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartamentoService } from '../../../service/departamento/departamento.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDepartamentoComponent } from './add-departamento/add-departamento.component';
import { DetailsDepartamentoComponent } from './details-departamento/details-departamento.component';
import { EditDepartamentoComponent } from './edit-departamento/edit-departamento.component';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from '../../../snackbar/snackbar.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['IdDepartamento', 'Descripcion', 'action'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private departamentoService: DepartamentoService, private dialog: MatDialog, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.getDepartamentos();
  }
  
  openAddDialog() {
    this.dialog.open(AddDepartamentoComponent, {
      panelClass: 'add-departamento-dialog',
      width: '40%',
      autoFocus: false,
    }).afterClosed()
      .subscribe((res) => {
        if (res == true) {
          this.getDepartamentos();
        }
      });
  }

  getDepartamentos() {
    this.departamentoService.getDepartamentos().subscribe((data: any[]) => {
      if (data) {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  modify(idDepartamento) {
    this.dialog.open(EditDepartamentoComponent, {
      panelClass: 'edit-departamento-dialog',
      width: '50%',
      autoFocus: false,
      data: {
        dataKey: idDepartamento
      },
    }).afterClosed()
      .subscribe((res) => {
        if (res == true) {
          this.getDepartamentos();
        }
    });
  }

  details(idDepartamento) {
    this.dialog.open(DetailsDepartamentoComponent, {
      panelClass: 'details-departamento-dialog',
      width: '50%',
      autoFocus: false,
      data: {
        dataKey: idDepartamento
      }
    });
  }

  delete(idDepartamento, descripcion) {
    if (confirm("¿Desea borrar el departamento " + idDepartamento +": "+ descripcion + "?")) {
      this.departamentoService.deleteDepartamento(idDepartamento).subscribe(res => {
        this.snackbarService.openSnackBar("Departamento " + idDepartamento + ": " + descripcion + " eliminado");
        this.getDepartamentos();
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

}
