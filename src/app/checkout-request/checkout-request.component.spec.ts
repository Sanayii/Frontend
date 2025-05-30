import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutRequestComponent } from './checkout-request.component';

describe('CheckoutRequestComponent', () => {
  let component: CheckoutRequestComponent;
  let fixture: ComponentFixture<CheckoutRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
