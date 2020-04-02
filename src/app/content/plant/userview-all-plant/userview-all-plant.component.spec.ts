import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserviewAllPlantComponent } from './userview-all-plant.component';

describe('UserviewAllPlantComponent', () => {
  let component: UserviewAllPlantComponent;
  let fixture: ComponentFixture<UserviewAllPlantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserviewAllPlantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserviewAllPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
