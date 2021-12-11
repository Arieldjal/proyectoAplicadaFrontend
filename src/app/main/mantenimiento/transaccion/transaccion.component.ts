import { Component, OnInit, ViewChild } from '@angular/core';
import { TransaccionService } from '../../../service/transaccion/transaccion.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTransaccionComponent } from './add-transaccion/add-transaccion.component';
import { DetailsTransaccionComponent } from './details-transaccion/details-transaccion.component';
import { EditTransaccionComponent } from './edit-transaccion/edit-transaccion.component';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from '../../../snackbar/snackbar.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.css']
})
export class TransaccionComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['IdTransaccion', 'Descripcion', 'action'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private transaccionService: TransaccionService, private dialog: MatDialog, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.getTransacciones();
  }

  openAddDialog() {
    this.dialog.open(AddTransaccionComponent, {
      panelClass: 'add-transaccion-dialog',
      width: '40%',
      autoFocus: false,
    }).afterClosed()
      .subscribe((res) => {
        if (res == true) {
          this.getTransacciones();
        }
      });
  }

  getTransacciones() {
    this.transaccionService.getTransacciones().subscribe((data: any[]) => {
      if (data) {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  modify(idSexo) {
    this.dialog.open(EditTransaccionComponent, {
      panelClass: 'edit-transaccion-dialog',
      width: '50%',
      autoFocus: false,
      data: {
        dataKey: idSexo
      },
    }).afterClosed()
      .subscribe((res) => {
        if (res == true) {
          this.getTransacciones();
        }
    });
  }

  details(idSexo) {
    this.dialog.open(DetailsTransaccionComponent, {
      panelClass: 'details-transaccion-dialog',
      width: '50%',
      autoFocus: false,
      data: {
        dataKey: idSexo
      }
    });
  }

  delete(idTransaccion, descripcion) {
    if (confirm("¿Desea borrar la transaccion " + idTransaccion +": "+ descripcion + "?")) {
      this.transaccionService.deleteTransaccion(idTransaccion).subscribe(res => {
        this.snackbarService.openSnackBar("Transaccion " + idTransaccion + ": " + descripcion + " eliminada");
        this.getTransacciones();
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
