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
    let pdfWindow = window.open()
    pdfWindow.document.write(
      "<iframe width='100%' height='100%' src='" +
      encodeURI(this.solicitud.DocumentoActaConstitutiva) + "'></iframe>"
    )
  }

  downloadPdf() {
    let fileName = "Acta Constitutiva Solicitud " + this.solicitud.IdSolicitud + " " + this.solicitud.FechaHora;
    const source = `${this.file}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.pdf`
    link.click();
  }


}
