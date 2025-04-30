import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentService } from './payment.service';
import { ServiceService } from './service.service';
import { ArtisanService } from './artisan.service';
import { catchError, forkJoin, map, mergeMap, Observable, switchMap, throwError } from 'rxjs';
import { ServiceRequest, ServiceRequestWithDetails } from '../_Models/service-request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl = 'https://localhost:7234/api/ServiceRequestPayment/by-customer';
  constructor(
    private http: HttpClient,
    private paymentService: PaymentService,
    private serviceService: ServiceService,
    private artisanService: ArtisanService
  ) { }
    getCustomerRequests(customerId: string): Observable<any[]> {
      return this.http.get<any[]>(
        `${this.apiUrl}/${customerId}`
      ).pipe(
        map(requests => requests.map(request => ({
          ...request,
          createdAt: this.parseDate(request.createdAt),
          status: request.status || 0,
          paymentId: request.paymentId || 0,
          serviceId: request.serviceId || 0,
          artisanId: request.artisanId || null,
          // Initialize all required fields with defaults
          serviceName: '',
          artisanName: '',
          paymentMethod: '',
          paymentAmount: 0
        }))),
        catchError(error => {
          console.error('API Error:', error);
          return throwError(() => new Error('Failed to fetch requests'));
        })
      );
    }
    private parseDate(dateString: string): Date | null {
      if (!dateString || dateString === "0001-01-01T00:00:00") {
        return null;
      }
      return new Date(dateString);
    }
  
  private getPaymentMethodText(method: number): string {
    switch(method) {
      case 0: return 'Cash';
      case 1: return 'CreditCard';
      case 2: return 'PayPal';
      case 3: return 'BankTransfer';
      default: return 'Other';
    }
  }

}
