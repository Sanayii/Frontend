import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactFormDto } from '../_Models/ContactForm'
@Injectable({
  providedIn: 'root'
})
export class ContactFormService {
  private apiUrl = 'https://localhost:7234/api/contact';

  constructor(private http: HttpClient) { }

  sendContactMessage(formData: ContactFormDto): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}
