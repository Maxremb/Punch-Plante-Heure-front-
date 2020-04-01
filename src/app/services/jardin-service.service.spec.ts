import { TestBed } from '@angular/core/testing';

import { JardinServiceService } from './jardin-service.service';

describe('JardinServiceService', () => {
  let service: JardinServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JardinServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
