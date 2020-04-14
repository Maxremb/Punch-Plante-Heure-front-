import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAdminComponent } from './gestion-admin.component';

describe('GestionAdminComponent', () => {
  let component: GestionAdminComponent;
  let fixture: ComponentFixture<GestionAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
