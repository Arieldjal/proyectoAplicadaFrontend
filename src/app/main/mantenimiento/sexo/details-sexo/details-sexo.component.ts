import { Component, OnInit, Inject } from '@angular/core';
import { SexoService } from '../../../../service/sexo/sexo.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-details-sexo',
  templateUrl: './details-sexo.component.html',
  styleUrls: ['./details-sexo.component.css']
})
export class DetailsSexoComponent implements OnInit {

  sexo: any = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private sexoService: SexoService) { 
    this.sexoService.getSexoById(this.data.dataKey).subscribe((data: any) => {
      console.log(data)
      this.sexo = data;
    });
  }

  ngOnInit(): void {
  }

}
