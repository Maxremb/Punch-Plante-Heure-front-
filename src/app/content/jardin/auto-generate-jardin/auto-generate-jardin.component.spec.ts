import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoGenerateJardinComponent } from './auto-generate-jardin.component';

describe('AutoGenerateJardinComponent', () => {
  let component: AutoGenerateJardinComponent;
  let fixture: ComponentFixture<AutoGenerateJardinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoGenerateJardinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoGenerateJardinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
