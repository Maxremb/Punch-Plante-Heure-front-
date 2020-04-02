import { TestBed } from '@angular/core/testing';

import { modelPlantService } from './plante-modele-service.service';

describe('modelPlantService', () => {
  let service: modelPlantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(modelPlantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
