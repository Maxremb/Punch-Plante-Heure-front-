import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntetePlantAdminComponent } from './entete-plant-admin.component';

describe('EntetePlantAdminComponent', () => {
  let component: EntetePlantAdminComponent;
  let fixture: ComponentFixture<EntetePlantAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntetePlantAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntetePlantAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
