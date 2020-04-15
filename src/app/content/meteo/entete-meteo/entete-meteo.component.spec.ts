import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnteteMeteoComponent } from './entete-meteo.component';

describe('EnteteMeteoComponent', () => {
  let component: EnteteMeteoComponent;
  let fixture: ComponentFixture<EnteteMeteoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnteteMeteoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnteteMeteoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
