import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TrimestreService } from '../../../../service/trimestre/trimestre.service';
import { SnackbarService } from '../../../../snackbar/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-trimestre',
  templateUrl: './add-trimestre.component.html',
  styleUrls: ['./add-trimestre.component.css']
})
export class AddTrimestreComponent implements OnInit {

  trimestreForm: FormGroup;

  constructor(private trimestreService: TrimestreService, private snackbarService: SnackbarService, private dialogRef: MatDialogRef<AddTrimestreComponent>) {
    this.trimestreForm = new FormGroup({
      descripcion: new FormControl('', [Validators.required, Validators.minLength(2)])
    });
  }

  ngOnInit(): void {
  }

  addTrimestre(){
    if (!this.trimestreForm.valid) {
      return;
    }

    this.trimestreService.addTrimestre(this.trimestreForm.value).subscribe((result) => {
      if (result == true) {
        this.snackbarService.openSnackBar('Trimestre ingresado con éxito')
        this.dialogRef.close(true);
      } else {
        this.snackbarService.openSnackBar('Error al ingresar un nuevo trimestre')
      }
    }, (err) => {
      console.log(err);
    });

  }

}
