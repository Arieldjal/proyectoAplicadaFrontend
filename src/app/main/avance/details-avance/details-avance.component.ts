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

  viewPdfOnBrowser() {
    if(this.file+""!="null"){
      let pdfWindow = window.open()
      pdfWindow.document.write('<iframe src="' + this.file + '" frameborder="0" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;"></iframe>')
    }
    /*
    console.log(this.file)
    const fileURL = URL.createObjectURL(this.file);
    window.open(fileURL)*/
  }

  checkState(bool): string{
    if(bool){
      return "Terminado";
    }
    else
      return "Pendiente"
  }

}
