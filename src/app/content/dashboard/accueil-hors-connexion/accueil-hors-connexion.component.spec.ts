import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilHorsConnexionComponent } from './accueil-hors-connexion.component';

describe('AccueilHorsConnexionComponent', () => {
  let component: AccueilHorsConnexionComponent;
  let fixture: ComponentFixture<AccueilHorsConnexionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccueilHorsConnexionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilHorsConnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
