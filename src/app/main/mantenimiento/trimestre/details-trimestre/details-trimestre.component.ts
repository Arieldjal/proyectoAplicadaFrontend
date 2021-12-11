import { Component, OnInit, Inject } from '@angular/core';
import { TrimestreService } from '../../../../service/trimestre/trimestre.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-details-trimestre',
  templateUrl: './details-trimestre.component.html',
  styleUrls: ['./details-trimestre.component.css']
})
export class DetailsTrimestreComponent implements OnInit {

  trimestre: any = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private trimestreService: TrimestreService) { 
    this.trimestreService.getTrimestreById(this.data.dataKey).subscribe((data: any) => {
      console.log(data)
      this.trimestre = data;
    });
  }
  ngOnInit(): void {
  }

}
