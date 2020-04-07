import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnteteDepartementComponent } from './entete-departement.component';

describe('EnteteDepartementComponent', () => {
  let component: EnteteDepartementComponent;
  let fixture: ComponentFixture<EnteteDepartementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnteteDepartementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnteteDepartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
