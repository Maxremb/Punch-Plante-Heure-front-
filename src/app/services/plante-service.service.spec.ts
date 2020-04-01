import { TestBed } from '@angular/core/testing';

import { PlanteServiceService } from './plante-service.service';

describe('PlanteServiceService', () => {
  let service: PlanteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
