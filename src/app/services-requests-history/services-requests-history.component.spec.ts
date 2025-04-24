import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesRequestsHistoryComponent } from './services-requests-history.component';

describe('ServicesRequestsHistoryComponent', () => {
  let component: ServicesRequestsHistoryComponent;
  let fixture: ComponentFixture<ServicesRequestsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesRequestsHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesRequestsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
