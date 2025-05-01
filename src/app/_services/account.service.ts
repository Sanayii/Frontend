import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Login } from '../_Models/login';
import { Customer } from '../_Models/Customer';



@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {}
  private apiUrl = 'https://localhost:7234/api/Account/Register';

  isLogged = false;

  register(registerData: Customer) {
    return this.http.post<string>(this.apiUrl, registerData);
  }


  login(loginData: Login)
  {
    return this.http.post<string>('https://localhost:7234/api/Account/Login',loginData);
  }

  logout() {
    localStorage.removeItem('token');
    this.isLogged = false;
  }
}
