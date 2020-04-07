import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserviewKeysearchPlantComponent } from './userview-keysearch-plant.component';

describe('UserviewKeysearchPlantComponent', () => {
  let component: UserviewKeysearchPlantComponent;
  let fixture: ComponentFixture<UserviewKeysearchPlantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserviewKeysearchPlantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserviewKeysearchPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
