import { Component, OnInit, Inject } from '@angular/core';
import { AvanceService } from '../../../service/avance/avance.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-details-avance',
  templateUrl: './details-avance.component.html',
  styleUrls: ['./details-avance.component.css']
})
export class DetailsAvanceComponent implements OnInit {

  avance: any = {};
  file?: File;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private avanceService: AvanceService) {
    this.avanceService.getAvanceById(this.data.dataKey).subscribe((data: any) => {
      console.log(data);
      this.avance = data;
      this.file = this.avance.Documento;
    });
  }

  ngOnInit(): void {
  }

  downloadPdf() {
    let fileName = "Documento del Avance " + this.avance.IdSolicitud + " " + this.avance.FechaHora;
    const source = `${this.file}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.pdf`
    link.click();
  }

}
