import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Customer } from '../_models/Customer';
import { EditCustomerDTO } from '../_models/edit-customer.dto';

/*export interface Customer {
  id: string;
  fName: string;
  lName: string;
  age: number;
  city: string;
  street: string;
  government: string;
  email: string;
  phoneNumber: string;
  userName: string;
}*/
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'https://localhost:7234/api/Customer';

  constructor(private http: HttpClient) { }

  getCustomerById(customerId: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${customerId}`).pipe(
      catchError(this.handleError)
    );
  }
  updateCustomer(id: string, dto: EditCustomerDTO): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      responseType: 'json' as const
    };
  
    return this.http.put(`${this.apiUrl}/${id}`, dto, httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle empty but successful responses
        if (error.status === 200 && error.error instanceof ProgressEvent) {
          return of({ success: true, message: 'Update successful' });
        }
        return this.handleError(error);
      })
    );
  }
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client error: ${error.error.message}`;
    } else if (error.status === 400) {
      errorMessage = error.error || 'Bad request';
    } else if (error.status === 404) {
      errorMessage = 'Customer not found';
    } else if (error.status === 500) {
      errorMessage = 'Server error occurred';
    }else if (error.message) {
      errorMessage = error.message;
    }else {
      // Server-side error
      errorMessage = error.error?.message || 
                    error.error?.title || 
                    error.message || 
                    `Server returned ${error.status}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
  

}




