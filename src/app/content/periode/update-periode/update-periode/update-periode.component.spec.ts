import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePeriodeComponent } from './update-periode.component';

describe('UpdatePeriodeComponent', () => {
  let component: UpdatePeriodeComponent;
  let fixture: ComponentFixture<UpdatePeriodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePeriodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePeriodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
