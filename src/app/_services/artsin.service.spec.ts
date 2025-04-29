import { TestBed } from '@angular/core/testing';

import { ArtsinService } from './artsin.service';

describe('ArtsinService', () => {
  let service: ArtsinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtsinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
