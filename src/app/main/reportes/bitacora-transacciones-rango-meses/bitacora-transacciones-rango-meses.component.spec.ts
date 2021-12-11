import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitacoraTransaccionesRangoMesesComponent } from './bitacora-transacciones-rango-meses.component';

describe('BitacoraTransaccionesRangoMesesComponent', () => {
  let component: BitacoraTransaccionesRangoMesesComponent;
  let fixture: ComponentFixture<BitacoraTransaccionesRangoMesesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BitacoraTransaccionesRangoMesesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BitacoraTransaccionesRangoMesesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
