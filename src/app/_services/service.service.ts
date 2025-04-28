import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'https://localhost:7234/api/Service'
  constructor(private http: HttpClient) { }
  getServiceById(serviceId: number): Observable<{name: string} | null> {
    return this.http.get<{name: string}>(`${this.apiUrl}/${serviceId}`).pipe(
      catchError(() => of(null)) 
    );
  }
}
