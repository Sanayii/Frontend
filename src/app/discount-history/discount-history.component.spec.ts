import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountHistoryComponent } from './discount-history.component';

describe('DiscountHistoryComponent', () => {
  let component: DiscountHistoryComponent;
  let fixture: ComponentFixture<DiscountHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscountHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
