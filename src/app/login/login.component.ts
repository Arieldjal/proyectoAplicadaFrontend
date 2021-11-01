import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;
  loginForm: FormGroup;

  constructor(private loginService: LoginService, private router: Router, private snackBar: MatSnackBar) {
    this.loginForm = new FormGroup({
      loginName: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit(): void {
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }

    this.loginService.userLogin(this.loginForm.value).subscribe((result) => {
      if (result == true) {
        this.openSnackBar('Ha ingresado con exito')
        this.router.navigate(['/main']);
      } else {
        this.openSnackBar('El correo o la contraseña son incorrectos')
      }
    }, (err) => {
      console.log(err);
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar'],
    });
  }

}
