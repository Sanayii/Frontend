import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'https://localhost:7234/api/Payments/CustomerPayments'
  constructor(private http: HttpClient) { }

  getCustomerPayments(customerId: string): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/${customerId}`);
  }
  getPaymentById(paymentId: number): Observable<Payment | null> {
    return this.http.get<Payment>(`${this.apiUrl}/${paymentId}`).pipe(
      catchError(() => of(null)) // Return null if payment not found
    );
  }

  private URL = 'https://localhost:7234/api/ServiceRequestPayment';
  deletePayment(customerId: string, paymentId: number, serviceId: number): Observable<void> {
    const url = `${this.URL}/${customerId}/${paymentId}/${serviceId}`;
    return this.http.delete<void>(url);
  }

}
export interface Payment {
  id: number;
  status: number;
  amount: number;
  method: number;
  serviceRequestPayments: any[];
}
