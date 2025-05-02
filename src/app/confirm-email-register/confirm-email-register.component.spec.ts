import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEmailRegisterComponent } from './confirm-email-register.component';

describe('ConfirmEmailRegisterComponent', () => {
  let component: ConfirmEmailRegisterComponent;
  let fixture: ComponentFixture<ConfirmEmailRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmEmailRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmEmailRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
