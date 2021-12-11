import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSexoComponent } from './add-sexo.component';

describe('AddSexoComponent', () => {
  let component: AddSexoComponent;
  let fixture: ComponentFixture<AddSexoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSexoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSexoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
