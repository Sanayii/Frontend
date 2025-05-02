import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  getToken() {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  // Method to get the userId (user.Id) from the token
  getUserIdFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.nameid
          || decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
          || null;
    }
    return null;
  }

}
