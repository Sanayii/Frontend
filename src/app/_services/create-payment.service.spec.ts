import { TestBed } from '@angular/core/testing';

import { CreatePaymentService } from './create-payment.service';

describe('CreatePaymentService', () => {
  let service: CreatePaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatePaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
