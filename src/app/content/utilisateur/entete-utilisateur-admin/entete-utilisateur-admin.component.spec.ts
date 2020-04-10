import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnteteUtilisateurAdminComponent } from './entete-utilisateur-admin.component';

describe('EnteteUtilisateurAdminComponent', () => {
  let component: EnteteUtilisateurAdminComponent;
  let fixture: ComponentFixture<EnteteUtilisateurAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnteteUtilisateurAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnteteUtilisateurAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
