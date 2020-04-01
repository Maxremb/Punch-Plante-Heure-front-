import { TestBed } from '@angular/core/testing';

import { PlanteModeleServiceService } from './plante-modele-service.service';

describe('PlanteServiceService', () => {
  let service: PlanteModeleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanteModeleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
