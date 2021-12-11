import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransaccionService } from '../../../../service/transaccion/transaccion.service';
import { SnackbarService } from '../../../../snackbar/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-transaccion',
  templateUrl: './edit-transaccion.component.html',
  styleUrls: ['./edit-transaccion.component.css']
})
export class EditTransaccionComponent implements OnInit {

  transaccion: any = {};
  updateForm: FormGroup = new FormGroup({});

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private transaccionService: TransaccionService,
    private snackbarService: SnackbarService, private dialogRef: MatDialogRef<EditTransaccionComponent>) {

    this.updateForm = new FormGroup({
      idTransaccion: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required, Validators.minLength(2)]),
    });

    this.transaccionService.getTransaccionById(this.data.dataKey).subscribe((data: any) => {
      this.transaccion = data;
      this.updateForm.controls['idTransaccion'].setValue(this.data.dataKey);
    });
  }

  ngOnInit(): void {
  }

  updateTransaccion() {
    if (!this.updateForm.valid) {
      return;
    }

    this.transaccionService.updateTransaccion(this.updateForm.value).subscribe((result) => {
      if (result == true) {
        this.snackbarService.openSnackBar('Transacción ' + this.data.dataKey + ' actualizada con éxito')
        this.dialogRef.close(true);
      } else {
        this.snackbarService.openSnackBar('Error al actualizar la transacción ' + this.data.dataKey)
      }
    }, (err) => {
      console.log(err);
    });
  }

}
