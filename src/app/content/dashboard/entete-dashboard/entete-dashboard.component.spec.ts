import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnteteDashboardComponent } from './entete-dashboard.component';

describe('EnteteDashboardComponent', () => {
  let component: EnteteDashboardComponent;
  let fixture: ComponentFixture<EnteteDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnteteDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnteteDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
