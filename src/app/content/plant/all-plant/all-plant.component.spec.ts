import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPlantComponent } from './all-plant.component';

describe('AllPlantComponent', () => {
  let component: AllPlantComponent;
  let fixture: ComponentFixture<AllPlantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPlantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
