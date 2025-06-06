import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRequestDetailsComponent } from './service-request-details.component';

describe('ServiceRequestDetailsComponent', () => {
  let component: ServiceRequestDetailsComponent;
  let fixture: ComponentFixture<ServiceRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceRequestDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
