import { TestBed } from '@angular/core/testing';

import { PlanteUtilisateurService } from './plante-utilisateur-service.service';

describe('PlanteUtilisateurService', () => {
  let service: PlanteUtilisateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanteUtilisateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
