import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosSolicitudesCambiosComponent } from './proyectos-solicitudes-cambios.component';

describe('ProyectosSolicitudesCambiosComponent', () => {
  let component: ProyectosSolicitudesCambiosComponent;
  let fixture: ComponentFixture<ProyectosSolicitudesCambiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectosSolicitudesCambiosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosSolicitudesCambiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
