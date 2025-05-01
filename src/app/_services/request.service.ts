import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { artisan } from '../_Models/artsin';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl = 'https://localhost:7234/api/Customer/getServiceRequest';

  constructor(private http: HttpClient) {}

  getCustomerRequests(customerId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${customerId}`).pipe(
      map(requests =>
        requests.map(request => ({
          ...request,
          createdAt: this.parseDate(request.createdAt),
          status: request.status, // keep as returned
          paymentId: request.paymentId,
          serviceId: request.serviceId,
          artisanId: request.artisanId,

          // no overwriting of serviceName, artisanName, etc.
        }))
      ),
      catchError(error => {
        console.error('API Error:', error);
        return throwError(() => new Error('Failed to fetch requests'));
      })
    );
  }

  private parseDate(dateString: string): Date | null {
    if (!dateString || dateString === '0001-01-01T00:00:00') {
      return null;
    }
    return new Date(dateString);
  }

  private getPaymentMethodText(method: number): string {
    switch (method) {
      case 0: return 'Cash';
      case 1: return 'CreditCard';
      case 2: return 'PayPal';
      case 3: return 'BankTransfer';
      default: return 'Other';
    }
  }
}
