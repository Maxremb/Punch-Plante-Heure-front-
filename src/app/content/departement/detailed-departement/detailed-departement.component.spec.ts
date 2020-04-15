import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedDepartementComponent } from './detailed-departement.component';

describe('DetailedDepartementComponent', () => {
  let component: DetailedDepartementComponent;
  let fixture: ComponentFixture<DetailedDepartementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedDepartementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedDepartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
