import { Component, OnInit, Inject } from '@angular/core';
import { SolicitudService } from '../../../service/solicitud/solicitud.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-details-solicitud',
  templateUrl: './details-solicitud.component.html',
  styleUrls: ['./details-solicitud.component.css']
})
export class DetailsSolicitudComponent implements OnInit {

  solicitud: any = {};
  file?: File;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private solicitudService: SolicitudService) {
    this.solicitudService.getSolicitudById(this.data.dataKey).subscribe((data: any) => {
      this.solicitud = data;
      this.file = this.solicitud.DocumentoActaConstitutiva;
    });
  }

  ngOnInit(): void {
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

  downloadPdf() {
    let fileName = "Acta Constitutiva Solicitud " + this.solicitud.IdSolicitud + " " + this.solicitud.FechaHora;
    const source = `${this.file}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.pdf`
    link.click();
  }

  checkState(bool): string{
    if(bool){
      return "Terminado";
    }
    else
      return "Pendiente"
  }
}
