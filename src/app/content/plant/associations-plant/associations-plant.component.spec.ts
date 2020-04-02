import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationsPlantComponent } from './associations-plant.component';

describe('AssociationsPlantComponent', () => {
  let component: AssociationsPlantComponent;
  let fixture: ComponentFixture<AssociationsPlantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociationsPlantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociationsPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
