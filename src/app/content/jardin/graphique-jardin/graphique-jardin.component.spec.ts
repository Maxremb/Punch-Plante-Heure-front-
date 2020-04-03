import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphiqueJardinComponent } from './graphique-jardin.component';

describe('GraphiqueJardinComponent', () => {
  let component: GraphiqueJardinComponent;
  let fixture: ComponentFixture<GraphiqueJardinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphiqueJardinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphiqueJardinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
