import { PaymentMethod } from '../_enums/payment-method';
export class ServiceRequestDetailsDto {
  constructor(
    // category data
    public categoryId: number,
    public categoryName: string,

    // service data
    public serviceId: number,
    public serviceName: string,
    public description: string,
    public requestDate: Date,

    // payment data
    public paymentId: number,
    public paymentMethod: PaymentMethod,

    // customer data
    public customerName: string,
    public customerCity: string,
    public customerGovernment: string,
    public customerStreet: string,
    public customerPhoneNumbers: string[],

    // artisan data
    public artisanId: string,
    public artisanName: string
  ) { }
}
