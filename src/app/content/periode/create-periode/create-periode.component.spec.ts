import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePeriodeComponent } from './create-periode.component';

describe('CreatePeriodeComponent', () => {
  let component: CreatePeriodeComponent;
  let fixture: ComponentFixture<CreatePeriodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePeriodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePeriodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
