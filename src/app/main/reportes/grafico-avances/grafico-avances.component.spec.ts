import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoAvancesComponent } from './grafico-avances.component';

describe('GraficoAvancesComponent', () => {
  let component: GraficoAvancesComponent;
  let fixture: ComponentFixture<GraficoAvancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoAvancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoAvancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
