import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AccountService } from '../../_services/account.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../_Models/login';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: AccountService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(false),
  });

  get username() { return this.loginForm.get('username'); }
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  get rememberMe() { return this.loginForm.get('rememberMe'); }

  errorMessage: string | null = null;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['token']) {
        localStorage.setItem('token', params['token']);
        this.loginService.isLogged = true;
        this.router.navigate(['/home']);
      } else if (params['error']) {
        const error = params['error'];
        if (error === 'EmailMismatch') {
          this.errorMessage = 'Email not registered or login error.';
        } else if (error === 'external_login_failed') {
          this.errorMessage = 'External login failed. Please try again.';
        } else {
          this.errorMessage = 'An unexpected error occurred.';
        }
      }
    });
  }

  submit() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginData: Login = this.loginForm.value as Login;

    this.loginService.login(loginData).subscribe({
      next: (response: any) => {
        if (response?.token) {
          localStorage.setItem('token', response.token);
          this.loginService.isLogged = true;
          this.router.navigate(['/home']);
        }
      },
      error: () => {
        alert("Login failed! Please check your username and password.");
      }
    });
  }

  loginWithGoogle() {
    this.loginService.externalLogin('Google', '/external-login-callback');
  }

  loginWithFacebook() {
    this.loginService.externalLogin('Facebook', '/external-login-callback');
  }
}
