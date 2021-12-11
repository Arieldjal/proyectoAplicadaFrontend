import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartamentoService } from '../../../../service/departamento/departamento.service';
import { SnackbarService } from '../../../../snackbar/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-departamento',
  templateUrl: './edit-departamento.component.html',
  styleUrls: ['./edit-departamento.component.css']
})
export class EditDepartamentoComponent implements OnInit {

  departamento: any = {};
  updateForm: FormGroup = new FormGroup({});

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private departamentoService: DepartamentoService,
    private snackbarService: SnackbarService, private dialogRef: MatDialogRef<EditDepartamentoComponent>) {

    this.updateForm = new FormGroup({
      idDepartamento: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required, Validators.minLength(2)]),
    });

    this.departamentoService.getDepartamentoById(this.data.dataKey).subscribe((data: any) => {
      this.departamento = data;
      this.updateForm.controls['idDepartamento'].setValue(this.data.dataKey);
    });
  }

  ngOnInit(): void {
  }

  updateDepartamento() {
    if (!this.updateForm.valid) {
      return;
    }

    this.departamentoService.updateDepartamento(this.updateForm.value).subscribe((result) => {
      if (result == true) {
        this.snackbarService.openSnackBar('Departamento ' + this.data.dataKey + ' actualizado con éxito')
        this.dialogRef.close(true);
      } else {
        this.snackbarService.openSnackBar('Error al actualizar el departamento ' + this.data.dataKey)
      }
    }, (err) => {
      console.log(err);
    });
  }

}
