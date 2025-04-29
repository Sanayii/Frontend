import { PaymentMethod } from '../_enums/payment-method';

export class ServiceRequestViewModel {
  constructor(
    public CategoryId: number,
    public CustomerId: string,
    public ServiceName: string,
    public Description: string,
    public RequestDate: Date,
    public Status: number,
    public PaymentMethod: number
  ) { }
}
