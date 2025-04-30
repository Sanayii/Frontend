import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  // Method to get the userId (user.Id) from the token
  getUserIdFromToken(): string | null {
    const token = localStorage.getItem('token');  // Assuming the token is stored in localStorage

    if (token) {
      const decodedToken: any = jwtDecode(token);  // Decode the token into a JavaScript object
      return decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || null;
    }

    return null;
  }
}
