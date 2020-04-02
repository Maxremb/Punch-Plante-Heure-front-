import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserviewDetailedPlantComponent } from './userview-detailed-plant.component';

describe('UserviewDetailedPlantComponent', () => {
  let component: UserviewDetailedPlantComponent;
  let fixture: ComponentFixture<UserviewDetailedPlantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserviewDetailedPlantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserviewDetailedPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
