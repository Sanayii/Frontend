import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalLoginCallbackComponent } from './external-login-callback.component';

describe('ExternalLoginCallbackComponent', () => {
  let component: ExternalLoginCallbackComponent;
  let fixture: ComponentFixture<ExternalLoginCallbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternalLoginCallbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternalLoginCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
