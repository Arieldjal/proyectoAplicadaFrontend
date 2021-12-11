import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SexoService } from '../../../../service/sexo/sexo.service';
import { SnackbarService } from '../../../../snackbar/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-sexo',
  templateUrl: './edit-sexo.component.html',
  styleUrls: ['./edit-sexo.component.css']
})
export class EditSexoComponent implements OnInit {

  sexo: any = {};
  updateForm: FormGroup = new FormGroup({});

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private sexoService: SexoService,
    private snackbarService: SnackbarService, private dialogRef: MatDialogRef<EditSexoComponent>) {

    this.updateForm = new FormGroup({
      idSexo: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required, Validators.minLength(2)]),
    });

    this.sexoService.getSexoById(this.data.dataKey).subscribe((data: any) => {
      this.sexo = data;
      this.updateForm.controls['idSexo'].setValue(this.data.dataKey);
    });
  }

  ngOnInit(): void {
  }

  updateSexo() {
    if (!this.updateForm.valid) {
      return;
    }

    this.sexoService.updateSexo(this.updateForm.value).subscribe((result) => {
      if (result == true) {
        this.snackbarService.openSnackBar('Sexo ' + this.data.dataKey + ' actualizado con éxito')
        this.dialogRef.close(true);
      } else {
        this.snackbarService.openSnackBar('Error al actualizar el sexo ' + this.data.dataKey)
      }
    }, (err) => {
      console.log(err);
    });
  }

}
