import { Component, OnInit, ViewChild, ViewChildren, QueryList, ChangeDetectorRef  } from '@angular/core';
import { AvanceService } from '../../service/avance/avance.service';
import { SolicitudService } from '../../service/solicitud/solicitud.service';
import { MatDialog } from '@angular/material/dialog';
import { AddAvanceComponent } from './add-avance/add-avance.component';
import { DetailsAvanceComponent } from './details-avance/details-avance.component';
import { EditAvanceComponent } from './edit-avance/edit-avance.component';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { SnackbarService } from '../../snackbar/snackbar.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-avance',
  templateUrl: './avance.component.html',
  styleUrls: ['./avance.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AvanceComponent implements OnInit {

  dataSourceSolicitud: MatTableDataSource<any>;
  displayedColumns: string[] = ['IdSolicitud', 'FechaInicio', 'FechaFin', 'action'];
  expandedColumns: string[] = ['IdAvance', 'FechaHora', 'Descripcion', 'UsuarioAplicativo', 'action'];
  @ViewChild('outerSort') sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<any>>;
  searchKey: string;
  searchInnerKey: string;
  expandedElement: any;
  solicitudesData: any;

  constructor(private avanceService: AvanceService, private dialog: MatDialog, private snackbarService: SnackbarService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getSolicitudesAndAvances();
  }

  openAddDialog(idSolicitud) {
    this.dialog.open(AddAvanceComponent, {
      panelClass: 'add-avance-dialog',
      width: '40%',
      autoFocus: false,
      data: {
        dataKey: idSolicitud
      },
    }).afterClosed()
      .subscribe((res) => {
        if (res == true) {
          this.getSolicitudesAndAvances();
        }
      });
  }

  getSolicitudesAndAvances() {
    this.solicitudesData = [];

    this.avanceService.getAvances().subscribe((data: any[]) => {
      if (data) {
        
        data.forEach(row => {
          if (row.AvanceList && Array.isArray(row.AvanceList) && row.AvanceList.length) {
            this.solicitudesData = [...this.solicitudesData, { ...row, AvanceList: new MatTableDataSource(row.AvanceList) }];
          } else {
            this.solicitudesData = [...this.solicitudesData, row];
          }
          
        });
        
        this.dataSourceSolicitud = new MatTableDataSource(this.solicitudesData);
        this.dataSourceSolicitud.sort = this.sort;
        this.dataSourceSolicitud.paginator = this.paginator;
      }
    });
  }

  toggleRow(element) {
    element.AvanceList && (element.AvanceList as MatTableDataSource<any>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<any>).sort = this.innerSort.toArray()[index]);
  }

  applyFilterInnerTable() {
    this.innerTables.forEach((table) => (table.dataSource as MatTableDataSource<any>).filter = this.searchInnerKey.trim().toLowerCase());
  }

  modify(idAvance) {
    this.dialog.open(EditAvanceComponent, {
      panelClass: 'edit-avance-dialog',
      width: '40%',
      autoFocus: false,
      data: {
        dataKey: idAvance
      },
    }).afterClosed()
      .subscribe((res) => {
        if (res == true) {
          this.getSolicitudesAndAvances();
        }
      });
  }

  details(idAvance) {
    this.dialog.open(DetailsAvanceComponent, {
      panelClass: 'details-avance-dialog',
      width: '40%',
      autoFocus: false,
      data: {
        dataKey: idAvance
      }
    });
  }

  delete(idAvance) {
    if (confirm("¿Desea borrar el avance ID: " + idAvance + "?")) {
      this.avanceService.deleteAvance(idAvance).subscribe(res => {
        this.snackbarService.openSnackBar("Avance ID: " + idAvance + " eliminado");
        this.getSolicitudesAndAvances();
      });
    }
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  onInnerSearchClear() {
    this.searchInnerKey = "";
    this.applyFilterInnerTable();
  }

  applyFilter() {
    this.dataSourceSolicitud.filter = this.searchKey.trim().toLowerCase();
  }
}

