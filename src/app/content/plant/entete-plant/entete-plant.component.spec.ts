import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntetePlantComponent } from './entete-plant.component';

describe('EntetePlantComponent', () => {
  let component: EntetePlantComponent;
  let fixture: ComponentFixture<EntetePlantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntetePlantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntetePlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
