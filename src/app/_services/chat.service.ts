import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface ChatApiResponse {
  status: string;
  response: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'https://localhost:7234/api/chat';

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<ChatApiResponse> {
    return this.http.post<ChatApiResponse>(this.apiUrl, { message });
  }
}
