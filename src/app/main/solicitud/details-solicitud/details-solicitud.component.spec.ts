import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSolicitudComponent } from './details-solicitud.component';

describe('DetailsSolicitudComponent', () => {
  let component: DetailsSolicitudComponent;
  let fixture: ComponentFixture<DetailsSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
