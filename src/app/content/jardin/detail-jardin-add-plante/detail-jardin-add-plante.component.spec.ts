import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailJardinAddPlanteComponent } from './detail-jardin-add-plante.component';

describe('DetailJardinAddPlanteComponent', () => {
  let component: DetailJardinAddPlanteComponent;
  let fixture: ComponentFixture<DetailJardinAddPlanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailJardinAddPlanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailJardinAddPlanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
