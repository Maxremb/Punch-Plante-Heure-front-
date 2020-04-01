import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedPlantComponent } from './detailed-plant.component';

describe('DetailedPlantComponent', () => {
  let component: DetailedPlantComponent;
  let fixture: ComponentFixture<DetailedPlantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedPlantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
