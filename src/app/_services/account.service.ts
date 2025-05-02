import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Login } from '../_Models/login';
import { Customer } from '../_Models/Customer';
import { ChangePass } from '../_dtos/change-pass';
import { HttpParams } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class AccountService {
  isLogged = false;


  constructor(private http: HttpClient) {}

  private baseUrl = 'https://localhost:7234/api/Account';




  resetPassword(model: any) {
    return this.http.post(`${this.baseUrl}/ResetPassword`, model);
  }

  changePassword(model: ChangePass): Observable<any>  {
    return this.http.post(`${this.baseUrl}/ChangePassword`, model);
  }
  forgotPassword(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.post(`${this.baseUrl}/ForgotPassword`, null, { params });
  }
  register(registerData: Customer) {
    const url = `${this.baseUrl}/Register`;
    return this.http.post<string>(url, registerData);
  }

  login(loginData: Login) {
    const url = `${this.baseUrl}/Login`;
    return this.http.post<any>(url, loginData);
  }

  externalLogin(provider: string, returnUrl: string): void {
    const url = `${this.baseUrl}/ExternalLogin?provider=${provider}&returnUrl=${returnUrl}`;
    window.location.href = url;
  }

  externalLoginCallback(): Observable<any> {
    const url = `${this.baseUrl}/ExternalLoginCallback`;
    return this.http.get<any>(url);
  }

  logout() {
    localStorage.removeItem('token');
    this.isLogged = false;
  }
  confirmEmail(userId: string, token: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ConfirmEmail?userId=${userId}&token=${token}`);
  }
  resendConfirmationEmail(email: string): Observable<any> {
    return this.http.post(this.baseUrl + '/ResendConfirmationEmail?email=' + encodeURIComponent(email), {});
  }
}
