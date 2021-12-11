import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransaccionService } from '../../../../service/transaccion/transaccion.service';
import { SnackbarService } from '../../../../snackbar/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-transaccion',
  templateUrl: './add-transaccion.component.html',
  styleUrls: ['./add-transaccion.component.css']
})
export class AddTransaccionComponent implements OnInit {

  transaccionForm: FormGroup;

  constructor(private transaccionService: TransaccionService, private snackbarService: SnackbarService, private dialogRef: MatDialogRef<AddTransaccionComponent>) {
    this.transaccionForm = new FormGroup({
      descripcion: new FormControl('', [Validators.required, Validators.minLength(2)])
    });
  }

  ngOnInit(): void {
  }

  addTransaccion(){
    if (!this.transaccionForm.valid) {
      return;
    }

    this.transaccionService.addTransaccion(this.transaccionForm.value).subscribe((result) => {
      if (result == true) {
        this.snackbarService.openSnackBar('Transaccion ingresada con éxito')
        this.dialogRef.close(true);
      } else {
        this.snackbarService.openSnackBar('Error al ingresar una nueva transaccion')
      }
    }, (err) => {
      console.log(err);
    });

  }

}
