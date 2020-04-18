import { TestBed } from '@angular/core/testing';

import { GardenGuard } from './garden.guard';

describe('GardenGuard', () => {
  let guard: GardenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GardenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
