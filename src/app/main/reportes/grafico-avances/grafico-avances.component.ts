import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../service/reportes/reportes.service';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-grafico-avances',
  templateUrl: './grafico-avances.component.html',
  styleUrls: ['./grafico-avances.component.css']
})
export class GraficoAvancesComponent implements OnInit {
  graphData = [];
  multi: any[];

  view: [number, number] = [700, 500];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Proyectos';
  showYAxisLabel = true;
  yAxisLabel = 'Cantidad de Avances';

  constructor(private reportesService: ReportesService, private datePipe: DatePipe) { 
    this.reportesService.getAvancesProyectos().subscribe((data: any[]) => {
      if (data) {
        this.graphData = data;
      }
    });
  }

  ngOnInit(): void {}

  downloadAsPdf(){
    let date = new Date();
    let formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');

    let graph: HTMLElement = document.getElementById('graph-div')
    let width = graph.offsetWidth;
    let height = graph.offsetHeight;

    let options = {
      scale: 2.5
    };

    html2canvas(graph, options).then(function(canvas) {
      let doc = new jsPDF('l', 'px', [width, height]);
      let img = canvas.toDataURL("image/png");

      doc.addImage(img, 'PNG', 0, 0, width, height);
      doc.save('Gráfico Avances - '+formattedDate+".pdf");
  });
  }

}
