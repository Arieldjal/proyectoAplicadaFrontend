import { Component, OnInit, Inject } from '@angular/core';
import { FuncionarioService } from '../../../../service/funcionario/funcionario.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-details-funcionario',
  templateUrl: './details-funcionario.component.html',
  styleUrls: ['./details-funcionario.component.css']
})
export class DetailsFuncionarioComponent implements OnInit {

  funcionario: any = {};
  image?:File;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private funcionarioService: FuncionarioService) { 
    this.funcionarioService.getFuncionarioById(this.data.dataKey).subscribe((data: any) => {
      this.funcionario = data;
      this.image = this.funcionario.Foto;
    });
  }

  ngOnInit(): void {}


}
