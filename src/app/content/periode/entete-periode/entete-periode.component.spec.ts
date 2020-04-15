import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntetePeriodeComponent } from './entete-periode.component';

describe('EntetePeriodeComponent', () => {
  let component: EntetePeriodeComponent;
  let fixture: ComponentFixture<EntetePeriodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntetePeriodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntetePeriodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
