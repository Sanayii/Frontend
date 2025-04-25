import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtsinComponent } from './artsin.component';

describe('ArtsinComponent', () => {
  let component: ArtsinComponent;
  let fixture: ComponentFixture<ArtsinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtsinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtsinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
