import { Component, OnInit, ViewChild } from '@angular/core';
import { FuncionarioService } from '../../../service/funcionario/funcionario.service';
import { MatDialog } from '@angular/material/dialog';
import { AddFuncionarioComponent } from './add-funcionario/add-funcionario.component';
import { DetailsFuncionarioComponent } from './details-funcionario/details-funcionario.component';
import { EditFuncionarioComponent } from './edit-funcionario/edit-funcionario.component';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from '../../../snackbar/snackbar.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['IdFuncionario', 'Nombre', 'Apellidos', 'FechaNacimiento', 'Sexo', 'Departamento', 'action'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private funcionarioService: FuncionarioService, private dialog: MatDialog, private snackbarService: SnackbarService) {

  }

  ngOnInit(): void {
    this.getFuncionarios();
  }

  openAddDialog() {
    this.dialog.open(AddFuncionarioComponent, {
      panelClass: 'add-funcionario-dialog',
      width: '40%',
      autoFocus: false,
    }).afterClosed()
      .subscribe((res) => {
        if (res == true) {
          this.getFuncionarios();
        }
      });
  }

  getFuncionarios() {
    this.funcionarioService.getFuncionarios().subscribe((data: any[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  modify(idFuncionario) {
    this.dialog.open(EditFuncionarioComponent, {
      panelClass: 'edit-funcionario-dialog',
      width: '50%',
      autoFocus: false,
      data: {
        dataKey: idFuncionario
      },
    }).afterClosed()
      .subscribe((res) => {
        if (res == true) {
          this.getFuncionarios();
        }
    });
  }

  details(idFuncionario) {
    this.dialog.open(DetailsFuncionarioComponent, {
      panelClass: 'details-funcionario-dialog',
      width: '50%',
      autoFocus: false,
      data: {
        dataKey: idFuncionario
      }
    });
  }

  delete(idFuncionario, nombre, apellidos) {
    if (confirm("¿Desea borrar a " + nombre + " " + apellidos + "?")) {
      this.funcionarioService.deleteFuncionario(idFuncionario).subscribe(res => {
        this.snackbarService.openSnackBar("Funcionario " + idFuncionario + ": " + nombre + " " + apellidos + " eliminado");
        this.getFuncionarios();
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
