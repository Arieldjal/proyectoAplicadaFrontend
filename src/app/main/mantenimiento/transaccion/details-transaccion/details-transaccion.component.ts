import { Component, OnInit, Inject } from '@angular/core';
import { TransaccionService } from '../../../../service/transaccion/transaccion.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-details-transaccion',
  templateUrl: './details-transaccion.component.html',
  styleUrls: ['./details-transaccion.component.css']
})
export class DetailsTransaccionComponent implements OnInit {

  transaccion: any = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private transaccionService: TransaccionService) { 
    this.transaccionService.getTransaccionById(this.data.dataKey).subscribe((data: any) => {
      console.log(data)
      this.transaccion = data;
    });
  }

  ngOnInit(): void {
  }

}
