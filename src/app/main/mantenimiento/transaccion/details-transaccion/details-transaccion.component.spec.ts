import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTransaccionComponent } from './details-transaccion.component';

describe('DetailsTransaccionComponent', () => {
  let component: DetailsTransaccionComponent;
  let fixture: ComponentFixture<DetailsTransaccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsTransaccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTransaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
