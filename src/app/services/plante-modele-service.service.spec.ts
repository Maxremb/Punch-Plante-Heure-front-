import { TestBed } from '@angular/core/testing';

import { PlanteModeleService } from './plante-modele-service.service';

describe('PlanteModeleService', () => {
  let service: PlanteModeleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanteModeleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
