import { Component, OnInit, Inject } from '@angular/core';
import { DepartamentoService } from '../../../../service/departamento/departamento.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-details-departamento',
  templateUrl: './details-departamento.component.html',
  styleUrls: ['./details-departamento.component.css']
})
export class DetailsDepartamentoComponent implements OnInit {

  departamento: any = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private departamentoService: DepartamentoService) { 
    this.departamentoService.getDepartamentoById(this.data.dataKey).subscribe((data: any) => {
      console.log(data)
      this.departamento = data;
    });
  }

  ngOnInit(): void {
  }

}
