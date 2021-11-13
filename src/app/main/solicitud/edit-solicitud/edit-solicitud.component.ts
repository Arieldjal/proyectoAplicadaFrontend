import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SolicitudService } from '../../../service/solicitud/solicitud.service';
import { FuncionarioService } from '../../../service/funcionario/funcionario.service';
import { SnackbarService } from '../../../snackbar/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-edit-solicitud',
  templateUrl: './edit-solicitud.component.html',
  styleUrls: ['./edit-solicitud.component.css']
})
export class EditSolicitudComponent implements OnInit {

  solicitud: any = {};
  funcionarioCompleteList: any = [];
  usuarioAplicativoList: any = [];
  responsableTIList: any = [];
  responsableUsuarioFinalList: any = [];
  updateForm: FormGroup = new FormGroup({});
  base64: string = "Base64...";
  fileSelected?: File;
  fileUrl?: any;
  currentDate = new Date();
  currentDocumentName: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private solicitudService: SolicitudService, private funcionarioService: FuncionarioService,
    private snackbarService: SnackbarService, private dialogRef: MatDialogRef<EditSolicitudComponent>, private sant: DomSanitizer) {

    this.updateForm = new FormGroup({
      idSolicitud: new FormControl('', [Validators.required]),
      fechaInicio: new FormControl('', [Validators.required]),
      fechaFin: new FormControl('', [Validators.required]),
      documentoActaConstitutiva: new FormControl(null),
      idUsuarioAplicativo: new FormControl('', [Validators.required]),
      idResponsableTI: new FormControl('', [Validators.required]),
      idResponsableUsuarioFinal: new FormControl('', [Validators.required])
    });

    this.solicitudService.getSolicitudById(this.data.dataKey).subscribe((data: any) => {
      console.log(data);
      this.solicitud = data;
      this.fileUrl = this.solicitud.DocumentoActaConstitutiva;
      this.updateForm.controls['documentoActaConstitutiva'].setValue(this.solicitud.DocumentoActaConstitutiva);
      this.updateForm.controls['idSolicitud'].setValue(this.data.dataKey);

      if(this.solicitud.DocumentoActaConstitutiva==null || this.solicitud.DocumentoActaConstitutiva=="null"){
        this.currentDocumentName = "No hay documento guardado";
      } else {
        this.currentDocumentName = "Acta Constitutiva Solicitud " + this.data.dataKey;
      }
    });
  }

  ngOnInit(): void {
    this.loadFuncionarioList();
  }

  updateSolicitud() {
    this.updateForm.controls['idUsuarioAplicativo'].setValue(JSON.parse(sessionStorage.getItem('currentUser')).IdFuncionario);

    if (!this.updateForm.valid) {
      return;
    }

    this.solicitudService.updateSolicitud(this.updateForm.value).subscribe((result) => {
      if (result == true) {
        this.snackbarService.openSnackBar('Solicitud ' + this.data.dataKey + ' actualizada con éxito')
        this.dialogRef.close(true);
      } else {
        this.snackbarService.openSnackBar('Error al actualizar la solicitud ' + this.data.dataKey)
      }
    }, (err) => {
      console.log(err);
    });
  }

  loadFuncionarioList() {
    this.funcionarioService.getMainFuncionariosData().subscribe((data: any[]) => {
      this.funcionarioCompleteList = data;
      this.responsableTIList = this.filterFuncionarios("TI");
    });
  }

  //Filtro los funcionarios según las listas para cargarlos en los select
  filterFuncionarios(deptToFilter): any[] {
    let list = [];
    list = this.funcionarioCompleteList.filter(function(item){
      return (item.Departamento == deptToFilter);
    });

    return list;
  }

  onSelectNewFile(elemnt: HTMLInputElement): void {
    if (elemnt.files?.length == 0) return;
    this.currentDocumentName = "Nuevo archivo cargado"
    this.fileSelected = (elemnt.files as FileList)[0];
    this.fileUrl = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileSelected)) as string;

    this.convertFileToBase64();
  }

  /** Convert File To Base64 */
  convertFileToBase64(): void {
    let reader = new FileReader();
    reader.readAsDataURL(this.fileSelected as Blob);
    reader.onloadend = () => {
      this.base64 = reader.result as string;
      /*Asignar el archivo en base64 a la foto del funcionario*/
      this.updateForm.controls['documentoActaConstitutiva'].setValue(this.base64);
    }
  }
}
