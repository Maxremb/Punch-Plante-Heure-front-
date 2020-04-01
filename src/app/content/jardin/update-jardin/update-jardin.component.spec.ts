import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateJardinComponent } from './update-jardin.component';

describe('UpdateJardinComponent', () => {
  let component: UpdateJardinComponent;
  let fixture: ComponentFixture<UpdateJardinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateJardinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateJardinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
