import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnteteInscriptionComponent } from './entete-inscription.component';

describe('EnteteInscriptionComponent', () => {
  let component: EnteteInscriptionComponent;
  let fixture: ComponentFixture<EnteteInscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnteteInscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnteteInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
