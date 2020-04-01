import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPeriodeComponent } from './all-periode.component';

describe('AllPeriodeComponent', () => {
  let component: AllPeriodeComponent;
  let fixture: ComponentFixture<AllPeriodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPeriodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPeriodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
