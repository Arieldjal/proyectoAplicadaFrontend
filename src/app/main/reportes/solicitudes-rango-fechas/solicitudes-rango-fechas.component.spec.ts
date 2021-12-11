import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesRangoFechasComponent } from './solicitudes-rango-fechas.component';

describe('SolicitudesRangoFechasComponent', () => {
  let component: SolicitudesRangoFechasComponent;
  let fixture: ComponentFixture<SolicitudesRangoFechasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudesRangoFechasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesRangoFechasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
