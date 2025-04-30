import { Injectable } from '@angular/core';
import { ServiceRequestDetailsDto } from '../_dtos/serive-request-details-dto';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor() { }

  private serviceRequestDetails: ServiceRequestDetailsDto | null = null;

  setServiceRequestDetails(data: ServiceRequestDetailsDto) {
    this.serviceRequestDetails = data;
  }

  getServiceRequestDetails(): ServiceRequestDetailsDto | null {
    return this.serviceRequestDetails;
  }
}
