import { TestBed } from '@angular/core/testing';

import { PlanteUtilisateurServiceService } from './plante-utilisateur-service.service';

describe('PlanteUtilisateurServiceService', () => {
  let service: PlanteUtilisateurServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanteUtilisateurServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
