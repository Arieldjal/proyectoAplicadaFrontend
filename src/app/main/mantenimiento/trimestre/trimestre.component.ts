import { Component, OnInit, ViewChild } from '@angular/core';
import { TrimestreService } from '../../../service/trimestre/trimestre.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTrimestreComponent } from './add-trimestre/add-trimestre.component';
import { DetailsTrimestreComponent } from './details-trimestre/details-trimestre.component';
import { EditTrimestreComponent } from './edit-trimestre/edit-trimestre.component';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from '../../../snackbar/snackbar.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-trimestre',
  templateUrl: './trimestre.component.html',
  styleUrls: ['./trimestre.component.css']
})
export class TrimestreComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['IdTrimestre', 'Descripcion', 'action'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private trimestreService: TrimestreService, private dialog: MatDialog, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.getTrimestres();
  }

  openAddDialog() {
    this.dialog.open(AddTrimestreComponent, {
      panelClass: 'add-trimestre-dialog',
      width: '40%',
      autoFocus: false,
    }).afterClosed()
      .subscribe((res) => {
        if (res == true) {
          this.getTrimestres();
        }
      });
  }

  getTrimestres() {
    this.trimestreService.getTrimestres().subscribe((data: any[]) => {
      if (data) {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  modify(idTrimestre) {
    this.dialog.open(EditTrimestreComponent, {
      panelClass: 'edit-trimestre-dialog',
      width: '50%',
      autoFocus: false,
      data: {
        dataKey: idTrimestre
      },
    }).afterClosed()
      .subscribe((res) => {
        if (res == true) {
          this.getTrimestres();
        }
    });
  }

  details(idTrimestre) {
    this.dialog.open(DetailsTrimestreComponent, {
      panelClass: 'details-trimestre-dialog',
      width: '50%',
      autoFocus: false,
      data: {
        dataKey: idTrimestre
      }
    });
  }

  delete(idTrimestre, descripcion) {
    if (confirm("¿Desea borrar el trimestre " + idTrimestre +": "+ descripcion + "?")) {
      this.trimestreService.deleteTrimestre(idTrimestre).subscribe(res => {
        this.snackbarService.openSnackBar("Trimestre " + idTrimestre + ": " + descripcion + " eliminado");
        this.getTrimestres();
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
