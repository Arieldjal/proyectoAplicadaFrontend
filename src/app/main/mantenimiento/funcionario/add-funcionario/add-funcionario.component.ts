import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FuncionarioService } from '../../../../service/funcionario/funcionario.service';
import { SexoService } from '../../../../service/sexo/sexo.service';
import { DepartamentoService } from '../../../../service/departamento/departamento.service';
import { SnackbarService } from '../../../../snackbar/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-add-funcionario',
  templateUrl: './add-funcionario.component.html',
  styleUrls: ['./add-funcionario.component.css']
})
export class AddFuncionarioComponent implements OnInit {

  funcionarioForm: FormGroup;
  sexList: any = [];
  departamentoList: any = [];
  base64: string = "Base64...";
  fileSelected?: File;
  imageUrl?: string;

  constructor(private sexoService: SexoService, private departamentoService: DepartamentoService, private funcionarioService: FuncionarioService,
    private snackbarService: SnackbarService, private dialogRef: MatDialogRef<AddFuncionarioComponent>, private sant: DomSanitizer) { 
    this.funcionarioForm = new FormGroup({
      idFuncionario: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
      apellidos: new FormControl('', [Validators.required, Validators.minLength(2)]),
      fechaNacimiento: new FormControl('', [Validators.required]),
      idSexo: new FormControl('', [Validators.required]),
      foto: new FormControl(null),
      loginName: new FormControl('', [Validators.required, Validators.email]),
      idDepartamento: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit(): void {
    this.loadSexList();
    this.loadDeparmentsList();
  }

  addFuncionario(){
    if (!this.funcionarioForm.valid) {
      return;
    }

    this.funcionarioService.addFuncionario(this.funcionarioForm.value).subscribe((result) => {
      if (result == true) {
        this.snackbarService.openSnackBar('Funcionario ingresado con éxito')
        this.dialogRef.close(true);
      } else {
        this.snackbarService.openSnackBar('Error al ingresar un nuevo funcionario')
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
      this.funcionarioForm.controls['foto'].setValue(this.base64);
    }
  }
}
