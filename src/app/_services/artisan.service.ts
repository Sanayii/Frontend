import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtisanService {

  private apiUrl = 'https://localhost:7234/api/Artisan';

  constructor(private http: HttpClient) { }

  getArtisanById(artisanId: string): Observable<{name: string} | null> {
    return this.http.get<{name: string}>(`${this.apiUrl}/${artisanId}`).pipe(
      catchError(() => of(null)) // Return null if artisan not found
    );
  }
}
