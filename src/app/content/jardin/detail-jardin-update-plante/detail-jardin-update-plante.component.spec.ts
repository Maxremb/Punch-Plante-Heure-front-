import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailJardinUpdatePlanteComponent } from './detail-jardin-update-plante.component';

describe('DetailJardinUpdatePlanteComponent', () => {
  let component: DetailJardinUpdatePlanteComponent;
  let fixture: ComponentFixture<DetailJardinUpdatePlanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailJardinUpdatePlanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailJardinUpdatePlanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
