import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteoDepComponent } from './meteo-dep.component';

describe('MeteoDepComponent', () => {
  let component: MeteoDepComponent;
  let fixture: ComponentFixture<MeteoDepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeteoDepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeteoDepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
