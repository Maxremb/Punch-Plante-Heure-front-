import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntetePlannindComponent } from './entete-plannind.component';

describe('EntetePlannindComponent', () => {
  let component: EntetePlannindComponent;
  let fixture: ComponentFixture<EntetePlannindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntetePlannindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntetePlannindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
