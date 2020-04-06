import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningJardinComponent } from './planning-jardin.component';

describe('PlanningJardinComponent', () => {
  let component: PlanningJardinComponent;
  let fixture: ComponentFixture<PlanningJardinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanningJardinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningJardinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
