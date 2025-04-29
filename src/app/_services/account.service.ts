import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../_Models/customer';
import { Observable } from 'rxjs/internal/Observable';
import { Login } from '../_Models/login';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {}
  private apiUrl = 'https://localhost:7234/api/Account/Register';

  register(registerData: Customer) {
    return this.http.post<string>(this.apiUrl, registerData);
  }


  login(loginData: Login)
  {
    return this.http.post<string>('https://localhost:7234/api/Account/Login',loginData);
  }
}
