import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoProyectosTerminadosPendientesComponent } from './grafico-proyectos-terminados-pendientes.component';

describe('GraficoProyectosTerminadosPendientesComponent', () => {
  let component: GraficoProyectosTerminadosPendientesComponent;
  let fixture: ComponentFixture<GraficoProyectosTerminadosPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoProyectosTerminadosPendientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoProyectosTerminadosPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
