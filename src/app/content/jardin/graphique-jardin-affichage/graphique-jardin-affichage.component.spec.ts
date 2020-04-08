import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphiqueJardinAffichageComponent } from './graphique-jardin-affichage.component';

describe('GraphiqueJardinAffichageComponent', () => {
  let component: GraphiqueJardinAffichageComponent;
  let fixture: ComponentFixture<GraphiqueJardinAffichageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphiqueJardinAffichageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphiqueJardinAffichageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
