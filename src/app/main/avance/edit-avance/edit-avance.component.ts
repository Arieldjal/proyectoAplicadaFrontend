import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AvanceService } from '../../../service/avance/avance.service';
import { SnackbarService } from '../../../snackbar/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-edit-avance',
  templateUrl: './edit-avance.component.html',
  styleUrls: ['./edit-avance.component.css']
})
export class EditAvanceComponent implements OnInit {

  avance: any = {};
  updateForm: FormGroup = new FormGroup({});
  base64: string = "Base64...";
  fileSelected?: File;
  fileUrl?: any;
  currentDocumentName: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private avanceService: AvanceService,
    private snackbarService: SnackbarService, private dialogRef: MatDialogRef<EditAvanceComponent>, private sant: DomSanitizer) {

    this.updateForm = new FormGroup({
      idAvance: new FormControl('', [Validators.required]),
      documento: new FormControl(null),
      idUsuarioAplicativo: new FormControl('', [Validators.required]),
      terminado: new FormControl('', [Validators.required]),
    });

    this.avanceService.getAvanceById(this.data.dataKey).subscribe((data: any) => {
      this.avance = data;
      this.fileUrl = this.avance.Documento;
      this.updateForm.controls['documento'].setValue(this.avance.Documento);
      this.updateForm.controls['idAvance'].setValue(this.data.dataKey);

      if (this.avance.Documento == null || this.avance.Documento == "null") {
        this.currentDocumentName = "No hay documento guardado";
      } else {
        this.currentDocumentName = "Documento Avance " + this.data.dataKey;
      }
    });
  }

  ngOnInit(): void { }

  updateAvance() {
    this.updateForm.controls['idUsuarioAplicativo'].setValue(JSON.parse(sessionStorage.getItem('currentUser')).IdFuncionario);

    console.log(this.updateForm.value);

    if (!this.updateForm.valid) {
      return;
    }

    this.avanceService.updateAvance(this.updateForm.value).subscribe((result) => {
      if (result == true) {
        this.snackbarService.openSnackBar('Avance ' + this.data.dataKey + ' actualizado con éxito')
        this.dialogRef.close(true);
      } else {
        this.snackbarService.openSnackBar('Error al actualizar el avance ' + this.data.dataKey)
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
      this.currentDocumentName = "Nuevo archivo cargado"
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
      this.updateForm.controls['documento'].setValue(this.base64);
    }
  }

  checkState(bool): string {
    if (bool) {
      return "Terminado";
    }
    else
      return "Pendiente"
  }

}
