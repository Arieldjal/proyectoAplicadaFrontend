import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TrimestreService } from '../../../../service/trimestre/trimestre.service';
import { SnackbarService } from '../../../../snackbar/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-trimestre',
  templateUrl: './edit-trimestre.component.html',
  styleUrls: ['./edit-trimestre.component.css']
})
export class EditTrimestreComponent implements OnInit {

  trimestre: any = {};
  updateForm: FormGroup = new FormGroup({});

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private trimestreService: TrimestreService,
    private snackbarService: SnackbarService, private dialogRef: MatDialogRef<EditTrimestreComponent>) {

    this.updateForm = new FormGroup({
      idTrimestre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required, Validators.minLength(2)]),
    });

    this.trimestreService.getTrimestreById(this.data.dataKey).subscribe((data: any) => {
      this.trimestre = data;
      this.updateForm.controls['idTrimestre'].setValue(this.data.dataKey);
    });
  }

  ngOnInit(): void {
  }

  updateTrimestre() {
    if (!this.updateForm.valid) {
      return;
    }

    this.trimestreService.updateTrimestre(this.updateForm.value).subscribe((result) => {
      if (result == true) {
        this.snackbarService.openSnackBar('Trimestre ' + this.data.dataKey + ' actualizado con éxito')
        this.dialogRef.close(true);
      } else {
        this.snackbarService.openSnackBar('Error al actualizar el trimestre ' + this.data.dataKey)
      }
    }, (err) => {
      console.log(err);
    });
  }

}
