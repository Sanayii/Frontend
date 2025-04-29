import { Injectable } from '@angular/core';
import { artisan } from '../_Models/artsin';
import { HttpClient } from '@angular/common/http';
import { ArtisanServiceRequest } from '../_Models/artisan-service-request';

@Injectable({
  providedIn: 'root'
})
export class ArtsinService {

  private baseUrl = 'https://localhost:7234/api/Artisan/';
  constructor(public http:HttpClient) {}

  getById(id: string){
    return this.http.get<artisan>(this.baseUrl  + id);
  }

  getArtisanServic(id:string)
  {
    return this.http.get<ArtisanServiceRequest[]>('https://localhost:7234/api/Artisan/getServiceRequest/' + id);
  }
}
