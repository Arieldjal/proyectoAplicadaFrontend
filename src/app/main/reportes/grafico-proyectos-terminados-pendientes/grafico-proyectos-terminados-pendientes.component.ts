import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../service/reportes/reportes.service';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-grafico-proyectos-terminados-pendientes',
  templateUrl: './grafico-proyectos-terminados-pendientes.component.html',
  styleUrls: ['./grafico-proyectos-terminados-pendientes.component.css']
})
export class GraficoProyectosTerminadosPendientesComponent implements OnInit {
  graphData = [];
  view: [number, number] = [700, 500];

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'right';
  legendTitle: string = "Leyenda";

  constructor(private reportesService: ReportesService, private datePipe: DatePipe) {
    this.reportesService.getProyectosPendientesTerminados().subscribe((data: any[]) => {
      if (data) {
        this.graphData = data;
      }
    });
  }

  ngOnInit(): void { }

  downloadAsPdf() {
    let date = new Date();
    let formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');

    let graph: HTMLElement = document.getElementById('graph-div') || new HTMLElement
    let width = graph.offsetWidth;
    let height = graph.offsetHeight;

    let options = {
      scale: 2.5
    };

    html2canvas(graph, options).then(function (canvas) {
      let doc = new jsPDF('l', 'px', [width, height]);
      let img = canvas.toDataURL("image/png", 1);

      doc.addImage(img, 'PNG', 0, 0, width, height);
      doc.save('Gráfico de proyectos terminados y pendientes - ' + formattedDate + ".pdf");
    });
  }

}
