import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllJardinComponent } from './all-jardin.component';

describe('AllJardinComponent', () => {
  let component: AllJardinComponent;
  let fixture: ComponentFixture<AllJardinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllJardinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllJardinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
