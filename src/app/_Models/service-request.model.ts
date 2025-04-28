
export interface ServiceRequest {
  createdAt: Date;
  executionTime: number;
  status: number;
  customerId: string;
  paymentId: number;
  serviceId: number;
  serviced: number;
}

export interface ServiceRequestWithDetails extends ServiceRequest {
  serviceName?: string;
  artisanName?: string;
  paymentMethod?: string;
  paymentAmount?: number;
}
