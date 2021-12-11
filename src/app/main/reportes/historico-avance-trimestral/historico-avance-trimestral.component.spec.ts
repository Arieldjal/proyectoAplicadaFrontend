import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoAvanceTrimestralComponent } from './historico-avance-trimestral.component';

describe('HistoricoAvanceTrimestralComponent', () => {
  let component: HistoricoAvanceTrimestralComponent;
  let fixture: ComponentFixture<HistoricoAvanceTrimestralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoAvanceTrimestralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoAvanceTrimestralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
