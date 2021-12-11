import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSexoComponent } from './edit-sexo.component';

describe('EditSexoComponent', () => {
  let component: EditSexoComponent;
  let fixture: ComponentFixture<EditSexoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSexoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSexoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
