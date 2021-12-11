import { Component, OnInit, Inject  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TrimestreService } from '../../../service/trimestre/trimestre.service';
import { AvanceService } from '../../../service/avance/avance.service';
import { SnackbarService } from '../../../snackbar/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from "@angular/platform-browser";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-avance',
  templateUrl: './add-avance.component.html',
  styleUrls: ['./add-avance.component.css']
})
export class AddAvanceComponent implements OnInit {

  avanceForm: FormGroup;
  base64: string = "Base64...";
  fileSelected?: File;
  fileUrl?: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private avanceService: AvanceService, private trimestreService: TrimestreService,
    private snackbarService: SnackbarService, private dialogRef: MatDialogRef<AddAvanceComponent>, private sant: DomSanitizer) { 
    this.avanceForm = new FormGroup({
      idAvance: new FormControl('', [Validators.required]),
      documento: new FormControl(null),
      idUsuarioAplicativo: new FormControl('', [Validators.required]),
      idSolicitud: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {}

  addAvance(){
    this.avanceForm.controls['idSolicitud'].setValue(this.data.dataKey);
    this.avanceForm.controls['idUsuarioAplicativo'].setValue(JSON.parse(sessionStorage.getItem('currentUser')).IdFuncionario);
    
    if (!this.avanceForm.valid) {
      return;
    }

    this.avanceService.addAvance(this.avanceForm.value).subscribe((result) => {
      if (result == true) {
        this.snackbarService.openSnackBar('Avance ingresado con éxito')
        this.dialogRef.close(true);
      } else {
        this.snackbarService.openSnackBar('Error al ingresar un nuevo avance')
      }
    }, (err) => {
      console.log(err);
    });

  }


  onSelectNewFile(elemnt: HTMLInputElement): void {
    let file = elemnt.files[0];
    
    //Maximo 5 megas
    if(file.size < (1024 * 1024)*5) {
      if (elemnt.files?.length == 0) return;
      this.fileSelected = (elemnt.files as FileList)[0];
      this.fileUrl = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileSelected)) as string;
      this.convertFileToBase64();

    } else {
      elemnt.value = null
      this.snackbarService.openSnackBar('El tamaño máximo aceptado para un archivo es de 5 MB')
    }
  }

  /** Convert File To Base64 */
  convertFileToBase64(): void {
    let reader = new FileReader();
    reader.readAsDataURL(this.fileSelected as Blob);
    reader.onloadend = () => {
      this.base64 = reader.result as string;
      /*Asignar el archivo en base64 a la foto del funcionario*/
      this.avanceForm.controls['documento'].setValue(this.base64);
    }
  }

}
