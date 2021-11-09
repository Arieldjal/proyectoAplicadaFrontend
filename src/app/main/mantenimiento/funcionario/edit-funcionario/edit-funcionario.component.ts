import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuncionarioService } from '../../../../service/funcionario/funcionario.service';
import { SexoService } from '../../../../service/sexo/sexo.service';
import { DepartamentoService } from '../../../../service/departamento/departamento.service';
import { SnackbarService } from '../../../../snackbar/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-edit-funcionario',
  templateUrl: './edit-funcionario.component.html',
  styleUrls: ['./edit-funcionario.component.css']
})
export class EditFuncionarioComponent implements OnInit {

  funcionario: any = {};
  sex: any = {};
  sexList: any = [];
  departamentoList: any = [];
  updateForm: FormGroup = new FormGroup({});
  base64: string = "Base64...";
  fileSelected?: File;
  imageUrl?: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private sexoService: SexoService, private departamentoService: DepartamentoService,
    private funcionarioService: FuncionarioService, private snackbarService: SnackbarService, private dialogRef: MatDialogRef<EditFuncionarioComponent>, 
    private sant: DomSanitizer) {

    this.updateForm = new FormGroup({
      idFuncionario: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
      apellidos: new FormControl('', [Validators.required, Validators.minLength(2)]),
      fechaNacimiento: new FormControl('', [Validators.required]),
      idSexo: new FormControl('', [Validators.required]),
      foto: new FormControl(),
      loginName: new FormControl('', [Validators.required, Validators.email]),
      idDepartamento: new FormControl('', [Validators.required])
    });

    this.funcionarioService.getFuncionarioById(this.data.dataKey).subscribe((data: any) => {
      this.funcionario = data;
      this.imageUrl = this.funcionario.Foto;
      this.updateForm.controls['foto'].setValue(this.funcionario.Foto);
      this.updateForm.controls['idFuncionario'].setValue(this.data.dataKey);
    });
  }

  ngOnInit(): void {
    this.loadSexList();
    this.loadDeparmentsList();
  }

  updateFuncionario() {
    if (!this.updateForm.valid) {
      return;
    }

    this.funcionarioService.updateFuncionario(this.updateForm.value).subscribe((result) => {
      if (result == true) {
        this.snackbarService.openSnackBar('Funcionario ' + this.data.dataKey + ' actualizado con éxito')
        this.dialogRef.close(true);
      } else {
        this.snackbarService.openSnackBar('Error al actualizar el funcionario ' + this.data.dataKey)
      }
    }, (err) => {
      console.log(err);
    });
  }

  loadSexList() {
    this.sexoService.getSexos().subscribe((data: any[]) => {
      this.sexList = data;
    });
  }

  loadDeparmentsList() {
    this.departamentoService.getDepartamentos().subscribe((data: any[]) => {
      this.departamentoList = data;
    });
  }

  onSelectNewFile(elemnt: HTMLInputElement): void {
    if (elemnt.files?.length == 0) return;
    this.fileSelected = (elemnt.files as FileList)[0];
    this.imageUrl = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileSelected)) as string;

    this.convertFileToBase64();
  }

  /** Convert File To Base64 */
  convertFileToBase64(): void {
    let reader = new FileReader();
    reader.readAsDataURL(this.fileSelected as Blob);
    reader.onloadend = () => {
      this.base64 = reader.result as string;
      /*Asignar el archivo en base64 a la foto del funcionario*/
      this.updateForm.controls['foto'].setValue(this.base64);
    }
  }
}
