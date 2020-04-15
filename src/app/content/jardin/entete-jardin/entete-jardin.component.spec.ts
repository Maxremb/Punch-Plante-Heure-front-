import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnteteJardinComponent } from './entete-jardin.component';

describe('EnteteJardinComponent', () => {
  let component: EnteteJardinComponent;
  let fixture: ComponentFixture<EnteteJardinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnteteJardinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnteteJardinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
