import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartamentoService } from '../../../../service/departamento/departamento.service';
import { SnackbarService } from '../../../../snackbar/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-departamento',
  templateUrl: './add-departamento.component.html',
  styleUrls: ['./add-departamento.component.css']
})
export class AddDepartamentoComponent implements OnInit {

  departamentoForm: FormGroup;

  constructor(private departamentoService: DepartamentoService, private snackbarService: SnackbarService, private dialogRef: MatDialogRef<AddDepartamentoComponent>) {
    this.departamentoForm = new FormGroup({
      descripcion: new FormControl('', [Validators.required, Validators.minLength(2)])
    });
  }

  ngOnInit(): void {
  }

  addDepartamento(){
    if (!this.departamentoForm.valid) {
      return;
    }

    this.departamentoService.addDepartamento(this.departamentoForm.value).subscribe((result) => {
      if (result == true) {
        this.snackbarService.openSnackBar('Departamento ingresado con éxito')
        this.dialogRef.close(true);
      } else {
        this.snackbarService.openSnackBar('Error al ingresar un nuevo departamento')
      }
    }, (err) => {
      console.log(err);
    });

  }

}
