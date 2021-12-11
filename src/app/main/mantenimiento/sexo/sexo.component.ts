import { Component, OnInit, ViewChild } from '@angular/core';
import { SexoService } from '../../../service/sexo/sexo.service';
import { MatDialog } from '@angular/material/dialog';
import { AddSexoComponent } from './add-sexo/add-sexo.component';
import { DetailsSexoComponent } from './details-sexo/details-sexo.component';
import { EditSexoComponent } from './edit-sexo/edit-sexo.component';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from '../../../snackbar/snackbar.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-sexo',
  templateUrl: './sexo.component.html',
  styleUrls: ['./sexo.component.css']
})
export class SexoComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['IdSexo', 'Descripcion', 'action'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private sexoService: SexoService, private dialog: MatDialog, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.getSexos();
  }

  openAddDialog() {
    this.dialog.open(AddSexoComponent, {
      panelClass: 'add-sexo-dialog',
      width: '40%',
      autoFocus: false,
    }).afterClosed()
      .subscribe((res) => {
        if (res == true) {
          this.getSexos();
        }
      });
  }

  getSexos() {
    this.sexoService.getSexos().subscribe((data: any[]) => {
      if (data) {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  modify(idSexo) {
    this.dialog.open(EditSexoComponent, {
      panelClass: 'edit-sexo-dialog',
      width: '50%',
      autoFocus: false,
      data: {
        dataKey: idSexo
      },
    }).afterClosed()
      .subscribe((res) => {
        if (res == true) {
          this.getSexos();
        }
    });
  }

  details(idSexo) {
    this.dialog.open(DetailsSexoComponent, {
      panelClass: 'details-sexo-dialog',
      width: '50%',
      autoFocus: false,
      data: {
        dataKey: idSexo
      }
    });
  }

  delete(idSexo, descripcion) {
    if (confirm("¿Desea borrar el sexo " + idSexo +": "+ descripcion + "?")) {
      this.sexoService.deleteSexo(idSexo).subscribe(res => {
        this.snackbarService.openSnackBar("Sexo " + idSexo + ": " + descripcion + " eliminado");
        this.getSexos();
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
