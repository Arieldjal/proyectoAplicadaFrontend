import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTransaccionComponent } from './edit-transaccion.component';

describe('EditTransaccionComponent', () => {
  let component: EditTransaccionComponent;
  let fixture: ComponentFixture<EditTransaccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTransaccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTransaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
