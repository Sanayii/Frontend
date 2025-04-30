import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { artisan } from '../_Models/artsin';
import { ArtisanServiceRequest } from '../_Models/artisan-service-request';

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
   getById(id: string){
      return this.http.get<artisan>(this.apiUrl  + id);
    }

    getArtisanServic(id:string)
    {
      return this.http.get<ArtisanServiceRequest[]>('https://localhost:7234/api/Artisan/getServiceRequest/' + id);
    }
}
