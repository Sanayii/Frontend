// service-request.model.ts
import { PaymentMethod } from '../_enums/payment-method'; // Adjust the import path as necessary
// Adjust the import path as necessary
export class ServiceRequestViewModel {
  constructor(
    public CategoryId: number,
    public CustomerId: string,
    public ServiceName: string,
    public Description: string,
    public RequestDate: Date,
    public Status: number,
    public PaymentMethod: PaymentMethod  // ✅ Use enum directly
  ) { }
}


