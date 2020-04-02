import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPeriodeComponent } from './detail-periode.component';

describe('DetailPeriodeComponent', () => {
  let component: DetailPeriodeComponent;
  let fixture: ComponentFixture<DetailPeriodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPeriodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPeriodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
