import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SexoService } from '../../../../service/sexo/sexo.service';
import { SnackbarService } from '../../../../snackbar/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-sexo',
  templateUrl: './add-sexo.component.html',
  styleUrls: ['./add-sexo.component.css']
})
export class AddSexoComponent implements OnInit {

  sexoForm: FormGroup;

  constructor(private sexoService: SexoService, private snackbarService: SnackbarService, private dialogRef: MatDialogRef<AddSexoComponent>) {
    this.sexoForm = new FormGroup({
      descripcion: new FormControl('', [Validators.required, Validators.minLength(2)])
    });
  }

  ngOnInit(): void {
  }

  addSexo(){
    if (!this.sexoForm.valid) {
      return;
    }

    this.sexoService.addSexo(this.sexoForm.value).subscribe((result) => {
      if (result == true) {
        this.snackbarService.openSnackBar('Sexo ingresado con éxito')
        this.dialogRef.close(true);
      } else {
        this.snackbarService.openSnackBar('Error al ingresar un nuevo sexo')
      }
    }, (err) => {
      console.log(err);
    });

  }

}
