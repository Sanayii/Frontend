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
      return decodedToken['nameid'] || null;  // Use the 'sub' claim (or whatever claim holds the userId)
    }

    return null;
  }
}
