import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AccountService } from '../../_services/account.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../_Models/login';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterLink,ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private loginService: AccountService, private router: Router) {}

  loginForm : FormGroup = new FormGroup({
    username: new FormControl('',[Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),

    rememberMe: new FormControl(false),

  });

  get username() { return this.loginForm.get('username'); }
  get email()    { return this.loginForm.get('email'); }
  get password()    { return this.loginForm.get('password'); }
  get rememberMe(){return this.loginForm.get('rememberMe');}



submit() {
    if (this.loginForm.invalid) {
      return; // if form is invalid, do nothing
    }

    const loginData: Login = this.loginForm.value as Login;

    console.log(loginData);

    this.loginService.login(loginData).subscribe({
      next: (response: any) => {
        localStorage.setItem("token", response.token);

        this.loginService.isLogged = true;

        this.router.navigate(['/home']);
      },
      error: err => {
        alert("Login failed! Please check your username and password.");
      }
    });

  }

}

