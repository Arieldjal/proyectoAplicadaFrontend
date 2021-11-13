import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FuncionarioService } from '../../../service/funcionario/funcionario.service';
import { SolicitudService } from '../../../service/solicitud/solicitud.service';
import { SnackbarService } from '../../../snackbar/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-add-solicitud',
  templateUrl: './add-solicitud.component.html',
  styleUrls: ['./add-solicitud.component.css']
})
export class AddSolicitudComponent implements OnInit {

  solicitudForm: FormGroup;
  funcionarioCompleteList: any = [];
  usuarioAplicativoList: any = [];
  responsableTIList: any = [];
  responsableUsuarioFinalList: any = [];
  base64: string = "Base64...";
  fileSelected?: File;
  fileUrl?: string;
  currentDate = new Date();

  constructor(private solicitudService: SolicitudService, private funcionarioService: FuncionarioService,
    private snackbarService: SnackbarService, private dialogRef: MatDialogRef<AddSolicitudComponent>, private sant: DomSanitizer) { 
    this.solicitudForm = new FormGroup({
      idSolicitud: new FormControl('', [Validators.required]),
      fechaInicio: new FormControl('', [Validators.required]),
      fechaFin: new FormControl('', [Validators.required]),
      documentoActaConstitutiva: new FormControl(null),
      idUsuarioAplicativo: new FormControl('', [Validators.required]),
      idResponsableTI: new FormControl('', [Validators.required]),
      idResponsableUsuarioFinal: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.loadFuncionarioList();
  }

  addSolicitud(){
    this.solicitudForm.controls['idUsuarioAplicativo'].setValue(JSON.parse(sessionStorage.getItem('currentUser')).IdFuncionario);

    if (!this.solicitudForm.valid) {
      return;
    }

    this.solicitudService.addSolicitud(this.solicitudForm.value).subscribe((result) => {
      if (result == true) {
        this.snackbarService.openSnackBar('Solicitud ingresada con éxito')
        this.dialogRef.close(true);
      } else {
        this.snackbarService.openSnackBar('Error al ingresar una nueva solicitud')
      }
    }, (err) => {
      console.log(err);
    });

  }

  loadFuncionarioList() {
    this.funcionarioService.getMainFuncionariosData().subscribe((data: any[]) => {
      console.log(data);
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
      this.solicitudForm.controls['documentoActaConstitutiva'].setValue(this.base64);
    }
  }

}
