import { TestBed } from '@angular/core/testing';

import { SeriveRequesPaymentService } from './serive-reques-payment.service';

describe('SeriveRequesPaymentService', () => {
  let service: SeriveRequesPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeriveRequesPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
