import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJardinComponent } from './create-jardin.component';

describe('CreateJardinComponent', () => {
  let component: CreateJardinComponent;
  let fixture: ComponentFixture<CreateJardinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateJardinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateJardinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
